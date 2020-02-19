// *********************************************************************************************************************
// Global variables                                                                                                    *
// difine global variables that will be use throughout the code                                                        *
// *********************************************************************************************************************
var csv_file_API = './UsersSample.csv';
var excel_file_API = './soccer_players.xlsx';

// Do some stuff when page hmtl page is launched
$(document).ready(function () {

    $("#headerTitle").hide(300).show(1500);

    // read Excel file and convert to json format using fetch
    fetch('./soccer_players.xlsx').then(function (res) {
        /* get the data as a Blob */
        if (!res.ok) throw new Error("fetch failed");
        return res.arrayBuffer();
    })
    .then(function (ab) {
        /* parse the data when it is received */
        var data = new Uint8Array(ab);
        var workbook = XLSX.read(data, {
            type: "array"
        });

        /* *****************************************************************
        * DO SOMETHING WITH workbook: Converting Excel value to Json       *
        ********************************************************************/
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        /************************ End of conversion ************************/

        console.log(_JsonData);

        $.each(_JsonData, function (index, value) {

            $('#showExcel').append(

                '<tr>' +
                    '<th scope="row">' +
                        value['时间'] +
                    '</th>' + 
                      
                    '<td>' +
                        '<span class="badge success-color badge-pill">' +
                            value.微信二维码及pos机人数 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                       '<span class="badge success-color badge-pill">' +
                        value.微信二维码及pos机金额 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                       '<span class="badge info-color-dark badge-pill">' +
                        value.现金及云闪付人数 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                       '<span class="badge info-color-dark badge-pill">' +
                        value.云闪付金额 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                       '<span class="badge info-color-dark badge-pill">' +
                        value.现金金额+
                        '</span>' +
                    '</td>' +
                    '<td>' +
                       '<span class="badge elegant-color-dark badge-pill">' +
                        value.交通银行人数 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                       '<span class="badge elegant-color-dark badge-pill">' +
                        value.交通银行金额 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                       '<span class="badge warning-color-dark badge-pill">' +
                        value.农业银行人数 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                       '<span class="badge warning-color-dark badge-pill">' +
                        value.农业银行金额 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                        '<span class="badge badge-primary badge-pill p-2">' +
                        value.支付宝人数 +
                        '</span>' +
                    '</td>' +
                    '<td>' +
                        '<span class="badge badge-primary badge-pill p-2">' +
                        value.支付宝金额 +
                        '</span>' +
                    '</td>' +
                     '<td>' +
                         '<span class="badge success-color-dark badge-pill">' +
                            value.当日收到捐款 +
                        '</span>' +
                    '</td>' +
                '</tr>'
            );

        });

    });

    // read csv file and convert to json format using ajax
    $.ajax({

        type: 'GET',

        url: csv_file_API,

        dataType: 'text',

        error: function (e) {
            alert('An error occurred while processing API calls');
            console.log("API call Failed: ", e);
        },

        success: function (data) {

            var jsonData = $.csv.toObjects(data);

            console.log(jsonData);

            $.each(jsonData, function (index, value) {

                $('#showCSV').append(

                    '<li class="list-group-item d-flex justify-content-between align-items-center">' + 
                        
                        '<span style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value['LAST NAME'] +
                        '</span>' +

                        '<span class="badge badge-primary badge-pill" style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value['EMAIL ADDRESS'] +
                        '</span>' +

                        '<span class="badge success-color badge-pill" style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value['PHONE NUMBER'] +
                        '</span>' +

                        '<span class="badge warning-color badge-pill" style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value.CITY +
                        '</span>' +

                        '<span class="badge primary-color-dark badge-pill" style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value.GET +
                        '</span>' +

                        '<span class="badge success-color-dark badge-pill" style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value.GET2 +
                        '</span>' +

                        '<span class="badge warning-color-dark badge-pill" style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value.GET3 +
                        '</span>' +

                        '<span class="badge danger-color-dark badge-pill" style="width: 15%; font-size: 1rem; font-weight: bold; color: #37474F">' +
                            value.GET7 +
                        '</span>' +

                    '</li>'
                );

            });

        } // end: Ajax success API call

    }); // end: of Ajax call

}); // end: document.ready()