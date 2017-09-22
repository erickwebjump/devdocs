import PreviewBlock from "./block";
import ko from "knockout";
import Config from "../../config";
export default class PreviewImageBlock extends PreviewBlock {
    constructor() {
        super(...arguments);
        this.loading = ko.observable(false);
        this.imageUrl = ko.computed(() => {
            if (this.image()) {
                return Config.getInitConfig('media_url') + this.image().replace('/media/', '');
                ;
            }
            return '';
        });
    }
    uploadUrl() {
        return Config.getPluginConfig('gene_widget_upload', 'upload_url');
    }
    attachmentSuccess() {
        return (file, response, bindKey) => {
            if (response.file) {
                this.parent.data()[bindKey] = response.file;
                this.parent.data.valueHasMutated();
                setTimeout(function () {
                    this.loading(false);
                }.bind(this), 50);
            }
            else {
                alert($t("Your image could not be uploaded"));
            }
        };
    }
    attachmentDrop() {
        return (event) => {
            jQuery(event.target).parents('.dz-drag-hover').removeClass('dz-drag-hover');
            this.loading(true);
        };
    }
    attachmentError() {
        this.loading(false);
        alert($t("Your image could not be uploaded"));
    }
}
