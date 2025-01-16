class CompletionProvider {
	constructor(syntax) {
			this.syntax = syntax;
			this.snippets = require("../Snippets/" + this.syntax + ".json")
			this.syntaxLabel = this.syntax.charAt(0).toUpperCase() + this.syntax.slice(1);
	}

	provideCompletionItems(editor, context) {
			let items = [];
			let detailType = this.detailType();
			let documentationType = this.documentationType();

			for (let snippet of this.snippets) {
					let description = this.titlize(snippet.name);
					let label = snippet.trigger;
					let item = new CompletionItem(label, CompletionItemKind.TagFramework);
					item.filterText = snippet.trigger;
					item.insertText = snippet.content;
					item.detail = this.detail(detailType, snippet);
					item.documentation =  this.documentation(documentationType, snippet);
					item.insertTextFormat = InsertTextFormat.Snippet;
					items.push(item);
			}

			return items;
	}

	titlize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	detailType() {
		return nova.config.get("besya.snippets-detail-type");
	}

	documentationType() {
		return nova.config.get("besya.snippets-documentation-type");
	}

	detail(type, snippet) {
		let syntax = this.syntaxLabel;
		let name = this.titlize(snippet.name);
		let delimeter = " | ";
		switch (type) {
			case "Name and Syntax":
				return name + delimeter + syntax;
			case "Name and text 'Snippets'":
				return name + delimeter + "Snippets";
			case "Name only":
				return name;
			case "Syntax only":
				return syntax;
			case "Text 'Snippets' only":
				return "Snippets";
			default:
				return "";
		}
	}

	documentation(type, snippet) {
		switch (type) {
				case "Plain Text":
					return snippet.content;
				case "Markdown":
					return "```" + this.syntax + "\n" + snippet.content + "\n```";
				default:
					return "";
		}
	}
}

module.exports = CompletionProvider;
