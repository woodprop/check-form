function doPost(e){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName(e.parameter.sheet));
  const sheet = SpreadsheetApp.getActiveSheet();
  const n = sheet.getLastRow() + 1;
  // const d = new Date();

  try {
    sheet.getRange("A"+n).setValue(e.parameter.date); // Дата
    sheet.getRange("B"+n).setValue(e.parameter.description); // описание
    sheet.getRange("G"+n).setValue(e.parameter.price); // цена
    sheet.getRange("D"+n).setValue(e.parameter.seller); // контрагент
    sheet.getRange("I"+n).setValue(e.parameter.paymentMethod); // Финпоток
    sheet.getRange("J"+n).setValue(e.parameter.direction); // Направление
    sheet.getRange("K"+n).setValue(e.parameter.department); // глобальная статья
    sheet.getRange("L"+n).setValue(e.parameter.purpose); // Статья расхода
    sheet.getRange("M"+n).setValue(e.parameter.name); // Кто внёс
  }
  catch(err) {
    return HtmlService.createHtmlOutput('errore')
    return ContentService.createTextOutput().append(JSON.stringify({result: 'EROORO'}))
  }


  return ContentService.createTextOutput().append(JSON.stringify({result: 'Success'}))
}

function OLDdoGet(request) {
  if (request) {
    const sheetName = request.parameter.sheetName;
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(sheetName)

    const res = {};
    for (const [key, value] of Object.entries(request.parameter)) {
      if (!key || key === 'sheetName') continue;
      let validVals;
      try {
        validVals = sheet.getRange(value + 5).getDataValidation().getCriteriaValues()[0].getValues();
      }
      catch(err) {
        validVals = sheet.getRange(value + 5).getDataValidation().getCriteriaValues()[0];
      }
      res[key] = validVals;
    }

    return ContentService.createTextOutput().append(JSON.stringify(res));
  }
}


function doGet(request) {
  const req = JSON.parse(request.parameter.request);
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  const result = {};


  for (const [category, obj] of Object.entries(req)) {
    result[category] = {};
    for (const [inputType, column] of Object.entries(obj)) {
    result[category][inputType] = getDataFromColumn(column);
  }
  }

  return ContentService.createTextOutput().append(JSON.stringify(result));




  function getDataFromColumn(column) {
    return sheet.getRange(`НАСТРОЙКИ!${column}3:${column}`).getValues().filter(String).flat();
  }
}




function test() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('Техно')
  // const vvv = sheet.getRange("I"+ 40).getDataValidation().getCriteriaValues()[0].getValues();
  // const vvv = sheet.getRange("K"+ 40).getDataValidation().getCriteriaValues()
  let vvv;
  try {
    vvv = sheet.getRange("I"+ 40).getDataValidation().getCriteriaValues()[0].getValues();
  }
  catch(err) {
    vvv = sheet.getRange("I"+ 40).getDataValidation().getCriteriaValues()[0];
  }

  console.log(vvv)
}

