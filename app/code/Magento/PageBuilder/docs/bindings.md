# Bindings

## Navigation

1. [Introduction]
2. [Installation guide]
3. [Contribution guide]
4. [Developer documentation]
    1. [Architecture overview]
    1. [BlueFoot to PageBuilder data migration]
    1. [Third-party content type migration]
    1. [Iconography]
    1. [Module integration]
    1. [Additional data configuration]
    1. [Content type configuration]
    1. [How to add a new content type]
    1. [Events]
    1. **Bindings** 
    1. [Master format]
    1. [Visual select]   
5. [Roadmap and known issues]

[Introduction]: README.md
[Contribution guide]: CONTRIBUTING.md
[Installation guide]: install.md
[Developer documentation]: developer-documentation.md
[Architecture overview]: architecture-overview.md
[BlueFoot to PageBuilder data migration]: bluefoot-data-migration.md
[Third-party content type migration]: new-content-type-example.md
[Iconography]: iconography.md
[Module integration]: module-integration.md
[Additional data configuration]: custom-configuration.md
[Content type configuration]: content-type-configuration.md
[How to add a new content type]: how-to-add-new-content-type.md
[Events]: events.md
[Master format]: master-format.md
[Visual select]: visual-select.md
[Roadmap and known issues]: roadmap.md

## Summary

As part of the Page Builder application, we provide new Knockout bindings you can use in your custom content types:

| Name           | Description                                                    | Usage                                  |
| -------------- | -------------------------------------------------------------- | -------------------------------------  |
| sortable       | Enables sorting the children of a bound element.               | \<div data-bind="sortable: {}"></div>  |
| draggable      | Enables draggable functionality on DOM elements.               | \<div data-bind="draggable: {}"></div> |

### Sortable binding
```
app/code/Magento/PageBuilder/view/adminhtml/web/ts/js/binding/sortable.ts
```

The options in this binding are passed to the jQuery UI sortable instance. All options and their descriptions are available on the jQuery UI site: http://api.jqueryui.com/sortable/.

Within Page Builder, we use the `sortable` binding to pass preview-component options to the drag-and-drop binding. We bind multiple options and events to the `sortable` instance so we can correctly respond to user actions when dragging and dropping content. Configuration and usage of the `sortable` binding can be seen in the Preview component:

Example Configuration: 
```
app/code/Magento/PageBuilder/view/adminhtml/web/ts/js/content-type/preview.ts
```
 
Example Usage: 
```
app/code/Magento/PageBuilder/view/adminhtml/web/template/content-type/preview.html
```

### Draggable binding
```
app/code/Magento/PageBuilder/view/adminhtml/web/ts/js/binding/draggable.ts
``` 

The options provided in this binding are passed to the jQuery UI draggable instance. All options and their descriptions are available on the jQuery UI site: http://api.jqueryui.com/draggable/.

Within Page Builder, we use this binding for the left panel's content types. The configuration and usage of the `draggable` binding can be seen in the Panel component:

Example Configuration: 
```
app/code/Magento/PageBuilder/view/adminhtml/web/ts/js/panel.ts
```
 
Example Usage: 
```
app/code/Magento/PageBuilder/view/adminhtml/web/template/panel.html
```
