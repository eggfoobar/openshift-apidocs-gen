const tmpl = require('handlebars');

// TODO -
// Need to either resursively descend dependsOn
// or link to an index of all related definitions

const assemblyTemplate = tmpl.compile(`
{{#each .}}
= {{name}}

{{#each resources}}
== {{name}} {{version}} {{group}}

{{#with (findDefinitionByKey definition)}}

{{description}}

=== Definitions

==== {{name}} [{{group}}/{{version}}]

The following table describes the parameters for a \`{{name}}\` object:

[cols="1,1,1",options="header"]
|===
| Property | Type | Description

{{#each (flatPropertiesForTable flatProperties)}}
| \`{{property}}\`
| {{type}}
| {{{escapeMarkup description}}}

{{/each}}
|===

{{#each relatedProperties}}
{{#with (findDefinitionByKey .)}}
==== {{kind}} [{{version}}/{{group}}]

The following table describes the parameters for a \`{{kind}}\` object:

[cols="1,1,1",options="header"]
|===

| Property | Type | Description
{{#each (flatPropertiesForTable flatProperties)}}
| \`{{property}}\`
| {{type}}
| {{{escapeMarkup description}}}

{{/each}}
|===
{{/with}}
{{/each}}

=== Operations

{{#each operationCategories}}
==== {{name}}

{{#each operations}}

===== {{operationTypeName}}
{{{description}}}

.HTTP request
\`{{httpMethod}}\` \`{{path}}\`

{{#if bodyParams}}
.HTTP body
[cols="1,1",options="header"]
|===
| Object | Type
{{#each bodyParams}}
| \`{{name}}\`
| {{type}}
{{/each}}
|===
{{/if}}

{{#if pathParams}}
.Path parameters
[cols="1,1",options="header"]
|===
| Parameter | Description
{{#each pathParams}}
| \`{{name}}\`
| {{{shorter description}}}
{{/each}}
|===
{{/if}}

{{#if queryParams}}
.Query parameters
[cols="1,1",options="header"]
|===
| Parameter | Description
{{#each queryParams}}
| \`{{name}}\`
| {{{shorter description}}}
{{/each}}
|===
{{/if}}

{{#if httpResponses}}
.HTTP responses
[cols="1,1",options="header"]
|===
| Code | Type
{{#each httpResponses}}
| {{code}} - {{{description}}}
| {{type}}
{{/each}}
|===
{{/if}}

{{/each}}

{{/each}}

{{/with}}

{{/each}}

{{/each}}
`);

module.exports = {
  assemblyTemplate
};
