define(['knockout',
    'templates/views/components/datatypes/bngcentrepoint.htm'
], function(ko, bngCentrePointTemplate) {
    var name = 'bngcentrepoint-datatype-config';
    ko.components.register(name, {
        viewModel: function(params) {
            var self = this;
            this.search = params.search;
            if (this.search) {
                var filter = params.filterValue();
                this.op = ko.observable(filter.op || '~');
                this.searchValue = ko.observable(filter.val || '');
                this.filterValue = ko.computed(function() {
                    return {
                        op: self.op(),
                        val: self.searchValue()
                    };
                }).extend({ throttle: 750 });
                params.filterValue(this.filterValue());
                this.filterValue.subscribe(function(val) {
                    params.filterValue(val);
                });
            }
        },
        template: bngCentrePointTemplate
    });
    return name;
});