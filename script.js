$(document).ready(function() {
    loadContent();
});




function loadContent() {
    $.get('news-feed.csv', function(data) {
        var news = parseCSV(data);
        console.log(news); // Output the parsed data to the console
        var html = '';
        for (var i = 0; i < news.length; i++) {
            if (news[i].title && news[i].link) { // Check that the required fields are present
                html += '<li><a href="#" onclick="openPopup(\'' + news[i].link + '\')">' + news[i].title + '</a></li>';
            } else if (news[i].title || news[i].link) { // Check if either field is present
                console.log('Warning: missing data in row ' + (i+1)); // Log a warning message if data is missing
            }
        }
        $('#news-feed').html(html);
    }).fail(function() {
        console.log('Error: could not load data from CSV file'); // Log an error message if the data could not be loaded
    });
}

function openPopup(link) {
    var popupHTML = '<div class="modal fade" id="popup" tabindex="-1" aria-labelledby="popupLabel" aria-hidden="true">';
    popupHTML += '<div class="modal-dialog modal-dialog-centered">';
    popupHTML += '<div class="modal-content">';
    popupHTML += '<div class="modal-header">';
    popupHTML += '<h5 class="modal-title" id="popupLabel">Popup Title</h5>';
    popupHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    popupHTML += '<span aria-hidden="true">&times;</span>';
    popupHTML += '</button>';
    popupHTML += '</div>';
    popupHTML += '<div class="modal-body">';
    popupHTML += '<p><iframe src="' + link + '"></iframe></p>';
    popupHTML += '</div>';
    popupHTML += '</div>';
    popupHTML += '</div>';
    popupHTML += '</div>';
    $('body').append(popupHTML);
    $('#popup').modal('show');
    $('#popup').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}



function parseCSV(data) {
  
    var lines = data.split('\n');
    var headers = lines[0].split(',');
    var news = [];
    for (var i = 1; i < lines.length; i++) {
        var row = {};
        var cells = lines[i].split(',');
        for (var j = 0; j < cells.length; j++) {
            row[headers[j].trim()] = cells[j].trim();
        }
        news.push(row);
    }
    return news;
}