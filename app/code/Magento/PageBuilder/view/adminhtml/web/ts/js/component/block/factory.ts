/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import loadModule from "Magento_PageBuilder/js/component/loader";
import events from "uiEvents";
import {ConfigContentBlock} from "../config";
import Stage from "../stage";
import EditableArea, {BlockMountEventParams} from "../stage/structural/editable-area";
import Block from "./block";
import dataConverterPoolFactory from "./data-converter-pool-factory";
import elementConverterPoolFactory from "./element-converter-pool-factory";

/**
 * Retrieve the block instance from the config object
 *
 * @param config
 * @returns {any|string}
 */
function getBlockComponentPath(config: ConfigContentBlock): string {
    return config.component || "Magento_PageBuilder/js/component/block/block";
}

/**
 * A block is ready once all of its children have mounted
 *
 * @param {Block} block
 * @param {number} childrenLength
 */
function fireBlockReadyEvent(block: Block, childrenLength: number) {
    const fire = () => {
        events.trigger("block:ready", {id: block.id, block});
        events.trigger(block.config.name + ":block:ready", {id: block.id, block});
    };

    if (childrenLength === 0) {
        fire();
    } else {
        let mountCounter = 0;
        events.on("block:mount", (args: BlockMountEventParams) => {
            if (args.block.parent.id === block.id) {
                mountCounter++;

                if (mountCounter === childrenLength) {
                    fire();
                    events.off(`block:mount:${block.id}`);
                }
            }
        }, `block:mount:${block.id}`);
    }
}

/**
 * Create a new instance of a block
 *
 * @param {ConfigContentBlock} config
 * @param {EditableArea} parent
 * @param {Stage} stage
 * @param {object} formData
 * @param {number} childrenLength
 * @returns {Promise<Block>}
 */
export default function createBlock(
    config: ConfigContentBlock,
    parent: EditableArea,
    stage: Stage,
    formData?: object,
    childrenLength: number = 0,
): Promise<Block> {
    stage = stage || parent.stage;
    formData = formData || {};
    const componentsPromise: Array<Promise<any>> = [
        elementConverterPoolFactory(config.name),
        dataConverterPoolFactory(config.name),
    ];
    return new Promise((resolve: (blockComponent: any) => void) => {
        Promise.all(componentsPromise).then((loadedConverters) => {
            const [elementConverterPool, dataConverterPool] = loadedConverters;
            loadModule([getBlockComponentPath(config)], (blockComponent: typeof Block) => {
                resolve(new blockComponent(parent, stage, config, formData, elementConverterPool, dataConverterPool));
            });
        }).catch((error) => {
            console.error(error);
        });
    }).then((block: Block) => {
        events.trigger("block:create", {id: block.id, block});
        events.trigger(config.name + ":block:create", {id: block.id, block});
        fireBlockReadyEvent(block, childrenLength);
        return block;
    });
}

export interface BlockCreateEventParams {
    id: string;
    block: Block;
}

export interface BlockReadyEventParams {
    id: string;
    block: Block;
}
