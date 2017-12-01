define(
    [
        'backbone',
        'proactive/model/SchemaModel',
        'text!proactive/templates/script-form-template.html',
    ],

    function (Backbone, SchemaModel, tpl) {

    "use strict";

    var scriptTemplate = _.template(tpl);

    return SchemaModel.extend({
        schema: {
            "Script": {
                type: "TextArea",
                fieldAttrs: {
                    'placeholder': ['code->#cdata-section', 'code->#text']},
                    template: scriptTemplate
            },
            "Language": {
                type: 'Select',
                options: [" ", "bash", "cmd", "docker-compose", "groovy", "javascript", "python", "cpython", "ruby", "perl", "powershell", "R"],
                fieldAttrs: {
                    'placeholder': 'code->@attributes->language',
                    "data-help":"The language of the code to execute."
                }
            },
            "Or Import Your Script from Url": {
                type: "Text",
                fieldAttrs: {'placeholder': 'file->@attributes->url'}
            },
            "Or Path": {
                type: "Hidden",
                fieldAttrs: {'placeholder': 'file->@attributes->path'}
            },
            "Arguments": {
                type: 'Hidden',
                itemType: 'Text',
                fieldAttrs: {'placeholder': 'file->arguments->argument', 'itemplaceholder': '@attributes->value'}
            }
        },
        populateSchema: function (obj) {
            SchemaModel.prototype.populateSchema.call(this, obj);
            var path = this.get("Or Path");
            if (path) {
                var fileName = path.replace(/^.*[\\\/]/, '');
                this.set("Library", fileName);
            }
        }
    })
})