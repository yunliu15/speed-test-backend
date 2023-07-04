const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    logTimestamp: String,
    desktopPerformanceScore: Number,
    desktopLoadTime: Number,
    desktopLoadingExperienceOverall: String,
    desktopFcpScore: {
        value: String,
        score: Number
    },
    desktopLcpScore: {
        value: String,
        score: Number
    },
    desktopClsScore: {
        value: String,
        score: Number
    },
    desktopTtiScore: {
        value: String,
        score: Number
    },
    mobilePerformanceScore: Number,
    mobileLoadTime: Number,
    mobileLoadingExperienceOverall: String,
    mobileFcpScore: {
        value: String,
        score: Number
    },
    mobileLcpScore: {
        value: String,
        score: Number
    },
    mobileClsScore: {
        value: String,
        score: Number
    },
    mobileTtiScore: {
        value: String,
        score: Number
    }
});

module.exports = mongoose.model(Result, resultSchema);