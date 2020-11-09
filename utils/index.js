export const parseTime = (time = 0) => {
	const formatStr = '{y}-{m}-{d} {h}:{i}:{s}'
	if (typeof time === 'string') {
		time = parseInt(time)
	}
	const date = new Date(time)
	const timeObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds()
	}
	const str = formatStr.replace(/{(y|m|d|h|i|s)}/g, (result, key) => {
		let val = timeObj[key]
		if (result.length > 0 && val < 10) {
			val = '0' + val
		}
		return val
	})
	return str
}