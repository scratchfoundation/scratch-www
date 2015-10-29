/**
 * Takes an ISO time and returns a string representing how long ago the date
 * represents. For example, "2015-01-01T00:00:00" becomes "1 minute ago".
 *
 * Based on "JavaScript Pretty Date"
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

var Format = {
    date: function (stamp) {
        stamp = (stamp || '').replace(/-/g,'/').replace(/[TZ]/g,' ');

        var date = new Date(stamp);
        var diff = (((new Date()).getTime() - date.getTime()) / 1000);
        var day_diff = Math.floor(diff / 86400);
            
        if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
            return 'A while ago';
        }
                
        return day_diff == 0 && (
                diff < 60 && 'Just now' ||
                diff < 120 && '1 minute ago' ||
                diff < 3600 && Math.floor( diff / 60 ) + ' minutes ago' ||
                diff < 7200 && '1 hour ago' ||
                diff < 86400 && Math.floor( diff / 3600 ) + ' hours ago') ||
            day_diff == 1 && 'Yesterday' ||
            day_diff < 7 && day_diff + ' days ago' ||
            day_diff < 31 && Math.ceil( day_diff / 7 ) + ' weeks ago';
    }
};

module.exports = Format;
