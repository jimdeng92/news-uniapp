import $http from '../http.js'

export const get_label = function(data) {
	return $http({
		url: 'get_label',
		data
	})
}