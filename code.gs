function doPost(e){
  if (e.parameter.action === 'getValidValues') {
    const validValues = getValidValues(e.parameter.request);
    return ContentService.createTextOutput().append(JSON.stringify(validValues));
  }

  if (e.parameter.action === 'add') {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    SpreadsheetApp.setActiveSheet(spreadsheet.getSheetByName(e.parameter.sheet));
    const sheet = SpreadsheetApp.getActiveSheet();
    const n = sheet.getLastRow() + 1;

    sheet.getRange("A"+n).setValue(e.parameter.date); // Дата
    sheet.getRange("B"+n).setValue(e.parameter.description); // описание
    sheet.getRange("G"+n).setValue(e.parameter.price); // цена
    sheet.getRange("D"+n).setValue(e.parameter.seller); // контрагент
    sheet.getRange("I"+n).setValue(e.parameter.paymentMethod); // Финпоток
    sheet.getRange("J"+n).setValue(e.parameter.direction); // Направление
    sheet.getRange("K"+n).setValue(e.parameter.department); // глобальная статья
    sheet.getRange("L"+n).setValue(e.parameter.purpose); // Статья расхода
    sheet.getRange("M"+n).setValue(e.parameter.name); // Кто внёс

    return ContentService.createTextOutput().append(JSON.stringify({result: 'Success'}))
  }
}


function getValidValues(r) {
  const req = JSON.parse(r);
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  const result = {};
  for (const [category, obj] of Object.entries(req)) {
    result[category] = {};
    for (const [inputType, column] of Object.entries(obj)) {
      result[category][inputType] = getDataFromColumn(column);
    }
  }

  return result;

  function getDataFromColumn(column) {
    return sheet.getRange(`НАСТРОЙКИ!${column}3:${column}`).getValues().filter(String).flat();
  }
}
