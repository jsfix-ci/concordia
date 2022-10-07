/* eslint-disable no-unused-vars, unicorn/prevent-abbreviations, unicorn/prefer-regexp-test, no-undef, no-redeclare*/

function Spinner(options) {
    options.$element.html(
        '<input type="text" size="1" ' +
            'class="ui-widget-content ui-corner-all"/>'
    );

    var $spinner = options.$element.find('input');
    var value = options.init;
    $spinner.spinner({
        min: options.min,
        max: options.max,
        step: options.step,
        spin: function (event, ui) {
            /*jshint unused:true */
            value = ui.value;
            options.updateCallback(value);
        },
    });
    $spinner.val(value);
    $spinner.keyup(function (e) {
        if (e.which === 13) {
            if (!this.value.match(/^-?\d?\.?\d*$/)) {
                this.value = options.init;
            } else if (options.min !== undefined && this.value < options.min) {
                this.value = options.min;
            } else if (options.max !== undefined && this.value > options.max) {
                this.value = options.max;
            }
            value = this.value;
            options.updateCallback(value);
        }
    });

    this.getValue = function () {
        return value;
    };
}

var idIncrement = 0;

function SpinnerSlider(options) {
    this.hash = idIncrement++;

    var spinnerId = 'wdzt-spinner-slider-spinner-' + this.hash;
    var sliderId = 'wdzt-spinner-slider-slider-' + this.hash;

    var value = options.init;

    options.$element.html(
        '<div class="wdzt-table-layout wdzt-full-width">' +
            '    <div class="wdzt-row-layout">' +
            '        <div class="wdzt-cell-layout">' +
            '            <input id="' +
            spinnerId +
            '" type="text" size="1"' +
            '                   class="ui-widget-content ui-corner-all"/>' +
            '        </div>' +
            '        <div class="wdzt-cell-layout wdzt-full-width">' +
            '            <div id="' +
            sliderId +
            '" class="wdzt-menu-slider">' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>'
    );

    var $slider = options.$element.find('#' + sliderId).slider({
        min: options.min,
        max: options.sliderMax !== undefined ? options.sliderMax : options.max,
        step: options.step,
        value: value,
        slide: function (event, ui) {
            /*jshint unused:true */
            value = ui.value;
            $spinner.spinner('value', value);
            options.updateCallback(value);
        },
    });
    var $spinner = options.$element.find('#' + spinnerId).spinner({
        min: options.min,
        max: options.max,
        step: options.step,
        spin: function (event, ui) {
            /*jshint unused:true */
            value = ui.value;
            $slider.slider('value', value);
            options.updateCallback(value);
        },
    });
    $spinner.val(value);
    $spinner.keyup(function (e) {
        if (e.which === 13) {
            value = $spinner.spinner('value');
            $slider.slider('value', value);
            options.updateCallback(value);
        }
    });

    this.getValue = function () {
        return value;
    };
}

// List of filters with their templates.
var availableFilters = [
    {
        name: 'Invert',
        generate: function () {
            return {
                html: '',
                getParams: function () {
                    return '';
                },
                getFilter: function () {
                    /*eslint new-cap: 0*/
                    return OpenSeadragon.Filters.INVERT();
                },
                sync: true,
            };
        },
    },
    {
        name: 'Contrast',
        help:
            'Range is from 0 to infinity, although sane values are from 0 ' +
            'to 4 or 5. Values between 0 and 1 will lessen the contrast ' +
            'while values greater than 1 will increase it.',
        generate: function (updateCallback) {
            var $html = $('<div></div>');
            var spinnerSlider = new SpinnerSlider({
                $element: $html,
                init: 1.3,
                min: 0,
                sliderMax: 4,
                step: 0.1,
                updateCallback: updateCallback,
            });
            return {
                html: $html,
                getParams: function () {
                    return spinnerSlider.getValue();
                },
                getFilter: function () {
                    return OpenSeadragon.Filters.CONTRAST(
                        spinnerSlider.getValue()
                    );
                },
                sync: true,
            };
        },
    },
    {
        name: 'Gamma',
        help:
            'Range is from 0 to infinity, although sane values ' +
            'are from 0 to 4 or 5. Values between 0 and 1 will ' +
            'lessen the contrast while values greater than 1 will increase it.',
        generate: function (updateCallback) {
            var $html = $('<div></div>');
            var spinnerSlider = new SpinnerSlider({
                $element: $html,
                init: 0.5,
                min: 0,
                sliderMax: 5,
                step: 0.1,
                updateCallback: updateCallback,
            });
            return {
                html: $html,
                getParams: function () {
                    return spinnerSlider.getValue();
                },
                getFilter: function () {
                    var value = spinnerSlider.getValue();
                    return OpenSeadragon.Filters.GAMMA(value);
                },
            };
        },
    },
    {
        name: 'Greyscale',
        generate: function () {
            return {
                html: '',
                getParams: function () {
                    return '';
                },
                getFilter: function () {
                    return OpenSeadragon.Filters.GREYSCALE();
                },
                sync: true,
            };
        },
    },
    {
        name: 'Brightness',
        help: 'Brightness must be between -255 (darker) and 255 (brighter).',
        generate: function (updateCallback) {
            var $html = $('<div></div>');
            var spinnerSlider = new SpinnerSlider({
                $element: $html,
                init: 50,
                min: -255,
                max: 255,
                step: 1,
                updateCallback: updateCallback,
            });
            return {
                html: $html,
                getParams: function () {
                    return spinnerSlider.getValue();
                },
                getFilter: function () {
                    return OpenSeadragon.Filters.BRIGHTNESS(
                        spinnerSlider.getValue()
                    );
                },
                sync: true,
            };
        },
    },
    {
        name: 'Thresholding',
        help: 'The threshold must be between 0 and 255.',
        generate: function (updateCallback) {
            var $html = $('<div></div>');
            var spinnerSlider = new SpinnerSlider({
                $element: $html,
                init: 127,
                min: 0,
                max: 255,
                step: 1,
                updateCallback: updateCallback,
            });
            return {
                html: $html,
                getParams: function () {
                    return spinnerSlider.getValue();
                },
                getFilter: function () {
                    return OpenSeadragon.Filters.THRESHOLDING(
                        spinnerSlider.getValue()
                    );
                },
                sync: true,
            };
        },
    },
];
availableFilters.sort(function (f1, f2) {
    return f1.name.localeCompare(f2.name);
});

var idIncrement = 0;
var hashTable = {};

availableFilters.forEach(function (filter) {
    var $li = $('<li></li>');
    var $plus = $(
        '<img src="/static/openseadragon-filtering/demo/images/plus.png" alt="+" class="button">'
    );
    $li.append($plus);
    $li.append(filter.name);
    $li.appendTo($('#available'));
    $plus.click(function () {
        var id = 'selected_' + idIncrement++;
        var generatedFilter = filter.generate(updateFilters);
        hashTable[id] = {
            name: filter.name,
            generatedFilter: generatedFilter,
        };
        var $li = $(
            '<li id="' +
                id +
                '"><div class="wdzt-table-layout"><div class="wdzt-row-layout"></div></div></li>'
        );
        var $minus = $(
            '<div class="wdzt-cell-layout"><img src="/static/openseadragon-filtering/demo/images/minus.png" alt="-" class="button"></div>'
        );
        $li.find('.wdzt-row-layout').append($minus);
        $li.find('.wdzt-row-layout').append(
            '<div class="wdzt-cell-layout filterLabel">' +
                filter.name +
                '</div>'
        );
        if (filter.help) {
            var $help = $(
                '<div class="wdzt-cell-layout"><img src="/static/openseadragon-filtering/demo/images/help-browser-2.png" alt="help" title="' +
                    filter.help +
                    '"></div>'
            );
            $help.tooltip();
            $li.find('.wdzt-row-layout').append($help);
        }
        $li.find('.wdzt-row-layout').append(
            $('<div class="wdzt-cell-layout wdzt-full-width"></div>').append(
                generatedFilter.html
            )
        );
        $minus.click(function () {
            delete hashTable[id];
            $li.remove();
            updateFilters();
        });
        $li.appendTo($('#selected'));
        updateFilters();
    });
});

$('#selected').sortable({
    containment: 'parent',
    axis: 'y',
    tolerance: 'pointer',
    update: updateFilters,
});

function updateFilters() {
    var filters = [];
    var sync = true;
    $('#selected li').each(function () {
        var id = this.id;
        var filter = hashTable[id];
        filters.push(filter.generatedFilter.getFilter());
        sync &= filter.generatedFilter.sync;
    });
    seadragonViewer.setFilterOptions({
        filters: {
            processors: filters,
        },
        loadMode: sync ? 'sync' : 'async',
    });
}
