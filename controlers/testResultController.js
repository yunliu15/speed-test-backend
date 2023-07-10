const Result = require('../model/Result');
const mongoose = require('mongoose');

const addResult = async (req, res) => {
    if(!req?.body?.domainName || !req?.body?.projectId || !req?.body?.domainId ) {
        return res.status(400).json({'message': 'Project Id, Domain Id and Domain name are required.'})
    }
    const projectId = req.body.projectId;
    const domainId = req.body.domainId;
    const domainName = req.body.domainName;
    const url_base = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${domainName}&category=PERFORMANCE&key=${process.env.GOOGLE_API_KEY}`;
    const urlMobile = url_base + '&strategy=MOBILE';
    const urlDesktop = url_base + '&strategy=DESKTOP';
    try {
        const mobileStream = await fetch(urlMobile);
        const mobileData = await mobileStream.json();
        console.log('mobile finished ', mobileData.analysisUTCTimestamp)
        const desktopStream = await fetch(urlDesktop);
        const desktopData = await desktopStream.json();
        console.log('desktop finished ', desktopData.analysisUTCTimestamp)
        const result = await Result.create({
            projectId: projectId,
            domainId: domainId,
            domain: domainName,
            logTimestamp: mobileData.analysisUTCTimestamp,
            desktopPerformanceScore: desktopData.lighthouseResult.categories.performance.score,
            desktopLoadTime: desktopData.lighthouseResult.timing.total,
            desktopLoadingExperienceOverall: desktopData.loadingExperience.overall_category,
            desktopFcpScore: {
                value: desktopData.lighthouseResult.audits['first-contentful-paint'].displayValue,
                score: desktopData.lighthouseResult.audits['first-contentful-paint'].score,
            },
            desktopLcpScore: {
                value: desktopData.lighthouseResult.audits['largest-contentful-paint'].displayValue,
                score: desktopData.lighthouseResult.audits['largest-contentful-paint'].score,
            },
            desktopClsScore: {
                value: desktopData.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
                score: desktopData.lighthouseResult.audits['cumulative-layout-shift'].score,
            },
            desktopTbtScore: {
                value: desktopData.lighthouseResult.audits['total-blocking-time'].displayValue,
                score: desktopData.lighthouseResult.audits['total-blocking-time'].score,
            },
            desktopSpeedIndex: {
                value: desktopData.lighthouseResult.audits['speed-index'].displayValue,
                score: desktopData.lighthouseResult.audits['speed-index'].score,
            },
            desktopTtiScore: {
                value: desktopData.lighthouseResult.audits['interactive'].displayValue,
                score: desktopData.lighthouseResult.audits['interactive'].score,
            },
            mobilePerformanceScore: mobileData.lighthouseResult.categories.performance.score,
            mobileLoadTime: mobileData.lighthouseResult.timing.total,
            mobileLoadingExperienceOverall: mobileData.loadingExperience.overall_category,
            mobileFcpScore: {
                value: mobileData.lighthouseResult.audits['first-contentful-paint'].displayValue,
                score: mobileData.lighthouseResult.audits['first-contentful-paint'].score,
            },
            mobileLcpScore: {
                value: mobileData.lighthouseResult.audits['largest-contentful-paint'].displayValue,
                score: mobileData.lighthouseResult.audits['largest-contentful-paint'].score,
            },
            mobileClsScore: {
                value: mobileData.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
                score: mobileData.lighthouseResult.audits['cumulative-layout-shift'].score,
            },
            mobileTbtScore: {
                value: mobileData.lighthouseResult.audits['total-blocking-time'].displayValue,
                score: mobileData.lighthouseResult.audits['total-blocking-time'].score,
            },
            mobileSpeedIndex: {
                value: mobileData.lighthouseResult.audits['speed-index'].displayValue,
                score: mobileData.lighthouseResult.audits['speed-index'].score,
            },
            mobileTtiScore: {
                value: mobileData.lighthouseResult.audits['interactive'].displayValue,
                score: mobileData.lighthouseResult.audits['interactive'].score,
            }
            
        });
        res.status(201).json(result);

    } catch (err) {
        return { Error: err.stack };
    }
}

const getResults = async (req, res) => {
    const page = req.querry?.p || 1;
    const perPage = 20;
    const results = await Result.find().sort([['logTimestamp', -1]]).limit(perPage).skip(perPage * (page - 1));
    if (!results) return res.status(204).json({'message': 'No results found.'});
    res.json(results);

}

module.exports = {
    addResult,
    getResults
}