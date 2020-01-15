define([
    'component/system/index'
], function(){
    alt.factory('Master_Sap', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/sap');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.delete = function(data){
            return this.connect('delete', data);
        };

        api.update = function(data){
            return this.connect('update', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.getbudgetscenario = function(data){
            return this.connect('getbudgetscenario', data);
        };

        api.getbudget = function(data){
            return this.connect('getbudget', data);
        };

        api.getorder = function(data){
            return this.connect('getorder', data);
        };

        api.postorder = function(data){
            return this.connect('postorder', data);
        };


        api.getinvoice = function(data){
            return this.connect('getinvoice', data);
        };

        api.postinvoice = function(data){
            return this.connect('getinvoice', data);
        };

        api.postinvoicebyid = function(data){
            return this.connect('postinvoicebyid', data);
        };

        api.postcustomerbyid = function(data){
            return this.connect('postcustomerbyid', data);
        };

        api.putcustomerbyid = function(data){
            return this.connect('putcustomerbyid', data);
        };

        api.postchargecodebyid = function(data){
            return this.connect('postchargecodebyid', data);
        };
        api.putchargecodebyid = function(data){
            return this.connect('putchargecodebyid', data);
        };

        api.postrabbyid = function(data){
            return this.connect('postrabbyid', data);
        };

        api.putrabbyid = function(data){
            return this.connect('putrabbyid', data);
        };

        api.postdraftinvoicebyid = function(data){
            return this.connect('postdraftinvoicebyid', data);
        };

        api.postdraftpaymentbyid = function(data){
            return this.connect('postdraftpaymentbyid', data);
        };

        api.postjurnalbyid = function(data){
            return this.connect('postjurnalbyid', data);
        };

        api.postpurchaseinvoicebyid = function(data){
            return this.connect('postpurchaseinvoicebyid', data);
        };

        api.postbappbyid = function(data){
            return this.connect('postbappbyid', data);
        };

        return api;
    }]);
});