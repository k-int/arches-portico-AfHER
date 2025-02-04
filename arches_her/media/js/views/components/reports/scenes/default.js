define([
    'underscore', 
    'knockout', 
    'arches', 
    'utils/report',
    'templates/views/components/reports/scenes/default.htm',
    'bindings/datatable',
    'bindings/reports', 
    'views/components/reports/scenes/keyvalue'], 
function(_, ko, arches, reportUtils, DefaultTemplate) {
    return ko.components.register('views/components/reports/scenes/default', {
        // IMPORTANT:  this scene *requires* you to compile your own data. 
        viewModel: function(params) {
            var self = this;
            Object.assign(self, reportUtils);

            self.cards = Object.assign({}, params.cards);
            self.resource = params?.data || undefined;
            self.edit = params.editTile || self.editTile;
            self.delete = params.deleteTile || self.deleteTile;
            self.add = params.addTile || self.addNewTile;
            self.data = ko.observable();
            self.data(ko.unwrap(params.data));
            self.visible = {};
            self.sections = ko.unwrap(params.data)?.sections || []
            for(const section of self.sections) {
                self.visible[section.title] = ko.observable(true);
            }
        },
        template: DefaultTemplate
    });
});