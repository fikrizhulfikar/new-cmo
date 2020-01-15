define([
    'component/system/index'
], function(){
    alt.factory('Pusharlis_Generatedoc', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('generatedoc');

        api.notadinasevaluasi = function(data){
            return this.connect('notadinasevaluasi', data);
        };

        api.pembatalan = function(data){
            return this.connect('pembatalan', data);
        };

        api.permohonansurvey = function(data){
            return this.connect('permohonansurvey', data);
        };

        api.waktusurvey = function(data){
            return this.connect('waktusurvey', data);
        };

        api.penugasansurvey = function(data){
            return this.connect('penugasansurvey', data);
        };

        api.hasilsurvey = function(data){
            return this.connect('hasilsurvey', data);
        };

        api.penawaranbiaya = function(data){
            return this.connect('penawaranbiaya', data);
        };

        api.rmp = function(data){
            return this.connect('rmp', data);
        };

        api.sktim = function(data){
            return this.connect('sktim', data);
        };

        api.plne38c = function(data){
            return this.connect('sktim', data);
        };

        api.dpd = function(data){
            return this.connect('dpd', data);
        };

        api.draftpenugasan = function(data){
            return this.connect('draftpenugasan', data);
        };

        api.pengalihananggaran = function(data){
            return this.connect('pengalihananggaran', data);
        };

        api.penugasanuwp = function(data){
            return this.connect('penugasanuwp', data);
        };

        api.notadinaspengadaan = function(data){
            return this.connect('notadinaspengadaan', data);
        };

        api.spki = function(data){
            return this.connect('spki', data);
        };

        api.bastppekerjaan = function(data){
            return this.connect('bastppekerjaan', data);
        };
        api.bapppengadaan = function(data){
            return this.connect('bapppengadaan', data);
        };
        api.bastppengadaan = function(data){
            return this.connect('bastppengadaan', data);
        };
        api.notabuku = function(data){
            return this.connect('notabuku', data);
        };
        api.qcpass = function(data){
            return this.connect('qcpass', data);
        };
        api.pemeriksaanteknis = function(data){
            return this.connect('pemeriksaanteknis', data);
        };
        api.pengesahan = function(data){
            return this.connect('pengesahan', data);
        };
        api.notadinasqc = function(data){
            return this.connect('notadinasqc', data);
        };
        api.pemeriksaanqc = function(data){
            return this.connect('pemeriksaanqc', data);
        };

        api.penawaranharga = function(data){
            return this.connect('penawaranharga', data);
        };

        api.nodin_casubmission = function(data){
            return this.connect('nodin_casubmission', data);
        };

        api.nodin_casettlement = function(data){
            return this.connect('nodin_casettlement', data);
        };

        api.nodin_expense = function(data){
            return this.connect('nodin_expense', data);
        };

        api.lampiranexpense = function(data){
            return this.connect('lampiranexpense', data);
        };

        api.lampirancasubmission = function(data){
            return this.connect('lampirancasubmission', data);
        };

        api.lampirancasettlement = function(data){
            return this.connect('lampirancasettlement', data);
        };

        api.timesheetkons = function(data){
            return this.connect('timesheetkons', data);
        };

        api.lampiranexpensewindows = function(data){
            return this.connect('lampiranexpensewindows', data);
        };

        api.lampiranexpenselinux = function(data){
            return this.connect('lampiranexpenselinux', data);
        };

        api.generateproduk = function(data){
            return this.connect('generateproduk', data);
        };

        api.sktimlinux = function(data){
            return this.connect('sktimlinux', data);
        };

        api.sktimwindows = function(data){
            return this.connect('sktimwindows', data);
        };

        api.sktimlinux = function(data){
            return this.connect('sktimlinux', data);
        };

        api.sktimwindows = function(data){
            return this.connect('sktimwindows', data);
        };

        api.chargecode = function(data){
            return this.connect('chargecode', data);
        };

        api.permohonan = function(data){
            return this.connect('permohonan', data);
        };
        return api;
    }]);
});