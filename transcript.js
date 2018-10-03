let scriptList;
let currentId = -1;

$(function() {
    $.ajax({
        type: "POST",
        url: "https://video.google.com/timedtext?lang=en&v=" + id,
        dataType: "xml"
    }).done(function (response) {
        scriptList = $(response).find("text");
    }).fail(function (response) {
        console.log(response);
    });
});

function getScriptList() {
    return scriptList;
}

function getNextPart() {
    // console.log(transcript)
    ++currentId;
    // console.log(scriptList[currentId])
    return { 
        start: Math.floor(parseFloat($(scriptList[currentId]).attr("start"))),
        end: Math.ceil(parseFloat($(scriptList[currentId]).attr("start")) + parseFloat($(scriptList[currentId]).attr("dur"))),
        text: $(scriptList[currentId]).text()
    };
}

function getPrevPart() {
    --currentId;
    // console.log(scriptList[currentId])
    return { 
        start: Math.floor(parseFloat($(scriptList[currentId]).attr("start"))),
        end: Math.ceil(parseFloat($(scriptList[currentId]).attr("start")) + parseFloat($(scriptList[currentId]).attr("dur"))),
        text: $(scriptList[currentId]).text()
    };
}
        