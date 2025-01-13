const XLSX = require('xlsx')

const convertSheetToObject = (worksheet) => {
  let count = 0
  let rows = []
  let currentRow = 0
  const keys = Object.keys(worksheet)

  for (let i in keys) {
    const key = keys[i]
    const firstCharacter = key.substring(0, 1)
    const column = key.replace(/\d/g, '')
    const row = parseInt(key.replace(/\D/g, ''))

    if (firstCharacter === '!') {
      continue
    }

    if (row === 1) {
      continue
    }

    if (row !== currentRow) {
      count++
      currentRow = row
    }

    if (!rows[row]) {
      rows[row] = {}
    }

    rows[row][worksheet[column + '1'].v.trim()] = worksheet[key].v
  }

  return rows
}

module.exports = {

  sanitizeString: (string) => {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  },

  readExcel: async (file, hasMultipleSheets = false) => {
    const path = file.upfile.filepath
    const workbook = XLSX.readFile(path)
    if (!hasMultipleSheets) {
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      return convertSheetToObject(worksheet)
    }
    const objectResponse = {}
    for (const worksheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[worksheetName]
      objectResponse[worksheetName] = convertSheetToObject(worksheet)
    }
    return objectResponse
  },

  writeExcel: async (obj, opts = {}, warning = null) => {
    const newBook = XLSX.utils.book_new()
    const newSheet = XLSX.utils.json_to_sheet(obj, opts)
    if (warning) {
      /**@doc adicionando aviso primeira linha */
      XLSX.utils.sheet_add_aoa(newSheet, [[warning]], { origin: 'A1' })
      /**@doc mesclando primeira linha */
      const range = XLSX.utils.decode_range(newSheet['!ref']);
      newSheet['!merges'] = [{
        s: { r: 0, c: 0 },
        e: { r: 0, c: range.e.c }
      }];
    }
    XLSX.utils.book_append_sheet(newBook, newSheet, "sheet1")
    return XLSX.write(newBook, { type: "buffer", bookType: "xlsx" })
  },

  createNewBook: () => {
    return XLSX.utils.book_new()
  },

  appendNewSheetToBook: (name, rows, book, opts = {}) => {
    const newSheet = XLSX.utils.json_to_sheet(rows, opts)
    XLSX.utils.book_append_sheet(book, newSheet, name)
  },

  writeBook: async (book) => {
    return XLSX.write(book, { type: "buffer", bookType: "xlsx" })
  },
}