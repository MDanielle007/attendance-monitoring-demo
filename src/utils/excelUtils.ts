import ExcelJS from 'exceljs'

export interface ExcelRow {
	[key: string]: string | number | boolean | null
}

/**
 * Parses an Excel (.xlsx) file into an array of row objects.
 * @param file - The uploaded file (Blob or File)
 * @returns An array of rows, each as an object with key-value pairs
 */
export async function importExcelFile(file: File): Promise<ExcelRow[]> {
	const workbook = new ExcelJS.Workbook()
	const buffer = await file.arrayBuffer()
	await workbook.xlsx.load(buffer)

	const worksheet = workbook.worksheets[0] // Use the first sheet
	const headers: string[] = []
	const rows: ExcelRow[] = []

	worksheet.eachRow((row, rowIndex) => {
		const rowValues = row.values as Array<string | number | null>

		if (rowIndex === 1) {
			// Header row
			rowValues.forEach((cell, i) => {
				if (i > 0) headers.push(cell?.toString().trim() ?? `Column${i}`)
			})
		} else {
			// Data rows
			const rowData: ExcelRow = {}
			rowValues.forEach((cell, i) => {
				if (i > 0 && headers[i - 1]) {
					rowData[headers[i - 1]] = cell ?? null
				}
			})
			rows.push(rowData)
		}
	})

	return rows
}

export function getRowKeys(row: ExcelRow): string[] {
  return Object.keys(row)
}
