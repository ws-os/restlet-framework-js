var Form = new Class(Series, {
	initialize: function() {
		this.callSuper();
	},

	createEntry: function(name, value) {
		return new Parameter(name, value);
	},

// [ifdef gwt] method uncomment
// @Override
// public Series<Parameter> createSeries(List<Parameter> delegate) {
// return new Form(delegate);
// }

	encode: function(characterSet, separator) {
		if (characterSet==null) {
			characterSet = CharacterSet.UTF_8;
		}
		if (separator==null) {
			separator = "&";
		}
		var sb = new StringBuilder();

		for (var i = 0; i < this.size(); i++) {
			if (i > 0) {
				sb.append(separator);
			}

			this.get(i).encode(sb, characterSet);
		}

		return sb.toString();
	},

	getMatrixString: function(characterSet) {
		if (characterSet==null) {
			characterSet = CharacterSet.UTF_8;
		}

		try {
			return encode(characterSet, ';');
		} catch (err) {
			return null;
		}
	},

	getQueryString: function(characterSet) {
		if (characterSet==null) {
			characterSet = CharacterSet.UTF_8;
		}

		try {
			return this.encode(characterSet);
		} catch (err) {
			return null;
		}
	},

	getWebRepresentation: function(characterSet) {
		if (characterSet==null) {
			characterSet = CharacterSet.UTF_8;
		}

		return new StringRepresentation(this.getQueryString(characterSet),
				MediaType.APPLICATION_WWW_FORM, null, characterSet);
	}
});