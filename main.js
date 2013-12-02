/*jslint browser: true*/
/*global  $, console, xively, jQuery*/
var feedID = 379559025;

jQuery(function () {
    //Set initial slider position
    xively.datastream.get(feedID, "daylightHours", function (datastream) {
        $('#slider').on("slidestop", function (event) {
            console.log($('#slider').val());
            xively.datastream.update(feedID, "daylightHours", {
                "current_value": $('#slider').val()
            }, function (data) {});
        });

        // Display the current value from the datastream
        $('#slider').val(datastream.current_value).slider("refresh");

    });

    liveUpdate(feedID, "temp", "#xivelyTemp");
    liveUpdate(feedID, "humidity", "#xivelyHumi");

});

function liveUpdate(feedID, datastreamID, selector) {
    xively.datastream.get(feedID, datastreamID, function (datastream) {
        $(selector).html(datastream.current_value);
        xively.datastream.subscribe(feedID, datastreamID, function (event, datastream_updated) {
            $(selector).html(datastream_updated.current_value);
        });
    });
}