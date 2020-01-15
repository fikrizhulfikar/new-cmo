define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/activiti/task',
    'component/iconplus/master/notifikasi'
], function(moment){
    return ['$scope', '$timeout', '$routeParams', '$button', '$log', '$auth', 'Activiti_Task', '$notification','Master_Notifikasi', function($scope, $timeout, $routeParams, $button, $log, $auth, Activiti_Task, $notification,Master_Notifikasi){

        $scope.$notification = $notification;

        $scope.setting = {
            aktivasi:{
                usrAktivasi:{
                    usergroups: [1,4],
                    label: "Pengesahan aktivasi",
                    url: alt.baseUrl + 'praproyek/aktivasicubicle/list'
                },
                usrPenugasanEvaluasi:{
                    usergroups: [1,5,10],
                    label: "Evaluasi Penugasan",
                    url: alt.baseUrl + 'penugasan/penugasan/list'
                },
                usrPenugasanMS:{
                    usergroups: [1,14],
                    label: "Verifikasi Evaluasi Penugasan",
                    url: alt.baseUrl + 'penugasan/penugasan/list'
                },
                usrPenugasanDir:{
                    usergroups: [1,15],
                    label: "Review & Approval Penugasan",
                    url: alt.baseUrl + 'penugasan/penugasan/list'
                },
                usrPermohonan:{
                    usergroups: [1,10],
                    label: "Penerbitan Chargecode",
                    url: alt.baseUrl + 'praproyek/penerbitanchargecode/list'
                },
                usrApprovalPermohonan:{
                    usergroups: [1,5],
                    label: "Approval Chargecode MAN",
                    url: alt.baseUrl + 'praproyek/approvalchargecode/list'
                },
                usrApprovalPermohonanMS:{
                    usergroups: [1,14],
                    label: "Approval Chargecode MS",
                    url: alt.baseUrl + 'praproyek/approvalchargecodems/list'
                },
                usrPenawaranLingkup:{
                    usergroups: [1,10],
                    label: "Input Rencana Kerja Proyek (RKP)",
                    url: alt.baseUrl + 'praproyek/penawaranharga/list?isruanglingkup=true'
                },
                usrPenawaranLingkupMan:{
                    usergroups: [1,5],
                    label: "Persetujuan Rencana Kerja Proyek (RKP)",
                    url: alt.baseUrl + 'praproyek/penawaranharga/list?isruanglingkup=true'
                },
                usrPenawaranLingkupMS:{
                    usergroups: [1,14],
                    label: "Persetujuan Rencana Kerja Proyek (RKP)",
                    url: alt.baseUrl + 'praproyek/penawaranharga/list?isruanglingkup=true'
                },
                usrPenawaran:{
                    usergroups: [1,10],
                    label: "Penawaran Harga",
                    url: alt.baseUrl + 'praproyek/penawaranharga/list'
                },
                usrPenawaranMan:{
                    usergroups: [1,5],
                    label: "Approval Penawaran Harga oleh MAN",
                    url: alt.baseUrl + 'praproyek/penawaranharga/list'
                },
                usrPenawaranMS:{
                    usergroups: [1,14],
                    label: "Approval Penawaran Harga oleh MS",
                    url: alt.baseUrl + 'praproyek/penawaranharga/list'
                },
                usrPenawaranUpload:{
                    usergroups: [1,5,10],
                    label: "Upload Penawaran Harga",
                    url: alt.baseUrl + 'praproyek/penawaranharga/list?isupload=true'
                },
                usrKontrak:{
                    usergroups: [1,10],
                    label: "Input Kontrak",
                    url: alt.baseUrl + 'penugasan/penugasan/list?isinputkontrak=true'
                },
                usrProdukAsman:{ // Belum Fix
                    usergroups: [1,10],
                    label: "Termin Pembayaran (Staff Pemasaran)",
                    url: alt.baseUrl + 'praproyek/produkbaru/list'
                },
                usrProdukMAdkon:{ // Belum Fix
                    usergroups: [1,5],
                    label: "Persetujuan Termin Pembayaran (Manajer Pemasaran)",
                    url: alt.baseUrl + 'praproyek/produkbaru/list'
                }
            },
            rmp:{
                usrUsulanTimpro:{
                    usergroups: [1,4],
                    label: "Penentuan Tim Proyek (Manajer Enjiniring)",
                    url: alt.baseUrl + 'praproyek/timpro/list'
                },
                // usrSetujuTimpro:{
                //     usergroups: [1,4],
                //     label: "Approve Tim Proyek(Manajer Enjiniring)",
                //     url: alt.baseUrl + 'praproyek/timpro/list'
                // },
                usrSahTimpro:{
                    usergroups: [1,3],
                    label: "Approve Tim Proyek(Manajer Senior)",
                    url: alt.baseUrl + 'praproyek/timpro/list'
                },
                usrPengesahanTimpro:{
                    usergroups: [1,9],
                    label: "Download Draft SKT dan Upload SKT (Admin MEng)",
                    url: alt.baseUrl + 'praproyek/uploadsk/list'
                },
                usrValidasiTimpro:{
                    usergroups: [1,2],
                    label: "Validasi Upload SKTim (Dir Eng)",
                    url: alt.baseUrl + 'praproyek/sktim/list'
                },
                usrWaktuPTL:{
                    usergroups: [1,7],
                    label: "Penyusunan RBP (PTL)",
                    url: alt.baseUrl + 'praproyek/waktubaru/list'
                },
                usrWaktuMan:{
                    usergroups: [1,4],
                    label: "Persetujuan RBP (Manajer Enjiniring)",
                    url: alt.baseUrl + 'praproyek/waktubaru/list_backup'
                },
                usrWaktuAdkon:{
                    usergroups: [1,3],
                    label: "Persetujuan RBP (Manajer Senior)",
                    url: alt.baseUrl + 'praproyek/waktubaru/list_backup'
                },
                usrUploadRAB:{
                    usergroups: [1,7],
                    label: "Upload RBP (PTL)",
                    url: alt.baseUrl + 'praproyek/uploadrab/list'
                },
                usrWaktuValidasi:{
                    usergroups: [1,2],
                    label: "Pengesahan RBP (Direktur Enjiniring)",
                    url: alt.baseUrl + 'praproyek/waktubaru/list_backup'
                },
                usrProsedurPTL:{
                    usergroups: [1,7],
                    label: "Input Prosedur Enjiniring(PTL)",
                    url: alt.baseUrl + 'praproyek/prosedurenjiniring/list'
                },
                usrProsedurMS: {
                    usergroups: [1,4],
                    label: "Persetujuan Prosedur Enjiniring(Manajer Enjiniring)",
                    url: alt.baseUrl + 'praproyek/prosedurenjiniring/list_backup'
                },
                usrProsedurKSMMR:{
                    usergroups: [1,7],
                    label: "Download Draft dan Upload RMP (PTL)",
                    url: alt.baseUrl + 'praproyek/uploadrmp/list'
                },
                usrProsedurQA:{
                    usergroups: [1,20],
                    label: "Verifikasi RMP (QA)",
                    url: alt.baseUrl + 'praproyek/prosedurenjiniring/list'
                },
                usrWaktuMS:{
                    usergroups: [1,3],
                    label: "Validasi Dok SKTim (MS)",
                    url: alt.baseUrl + 'praproyek/validasims/list'
                },
                revisiRabWbsPTL:{
                    usergroups: [1,7],
                    label: "Revisi Penyusunan WBS dan RAB (PTL)",
                    url: alt.baseUrl + 'praproyek/revisiwaktubaru/list'
                },
                revisiRabWbsMan:{
                    usergroups: [1,4],
                    label: "Persetujuan Revisi WBS dan RAB (Manajer Enjiniring)",
                    url: alt.baseUrl + 'praproyek/revisiwaktubaru/list'
                },
                revisiRabWbsMadkon:{
                    usergroups: [1,3],
                    label: "Persetujuan Revisi WBS dan RAB (Manajer Senior)",
                    url: alt.baseUrl + 'praproyek/revisiwaktubaru/list'
                },
                revisiRabWbsUploadPTL:{
                    usergroups: [1,7],
                    label: "Upload Revisi RAB (PTL)",
                    url: alt.baseUrl + 'praproyek/revisiwaktubaru/list'
                }
            },
            /*aktivasi:{
             usrAktivasi:{
             usergroups: [1,4,9],
             label: "Pengesahan aktivasi cubicle",
             url: alt.baseUrl + 'praproyek/aktivasi/list'
             }
             },*/
            dpd:{
                usrKualitasPTL:{
                    usergroups: [1,7],
                    label: "Daftar Pemeriksaan Desain  (PTL)",
                    url: alt.baseUrl + 'praproyek/dpd_tabel/list'
                },
                usrKualitasMan:{
                    usergroups: [1,4],
                    label: "Persetujuan DPD (Manajer Eng)",
                    url: alt.baseUrl + 'praproyek/dpd_baru/list'
                },

                usrKualitasQC:{
                    usergroups: [1,6],
                    label: "Persetujuan DPD (Oleh QC)",
                    url: alt.baseUrl + 'praproyek/dpd_baru/list'
                },
                usrKualitasMS:{
                    usergroups: [1,7],
                    label: "Upload DPD (Setelah ttd Oleh MS)",
                    url: alt.baseUrl + 'praproyek/uploaddpd/list'
                }

            },
            pekerjaan:{
                pekerjaan:{
                    usergroups: [1,7],
                    label: "Rencana Penyelesaian Produk",
                    url: alt.baseUrl + 'proyek/pekerjaan/list'
                },
                pekerjaanProgress:{
                    usergroups: [1,7],
                    label: "Upload Draft Produk",
                    url: alt.baseUrl + 'proyek/draftproduk/list'
                }
            },
            pemeriksaan:{
                usrTeknisMan:{
                    usergroups: [1,4],
                    label: "Verifikasi Teknis (Man) PE PLNE 3.8 Form C",
                    url: alt.baseUrl + 'proyek/teknis/list'
                },
                usrTeknisMS:{
                    usergroups: [1,3],
                    label: "Verifikasi Teknis (MS) PE PLNE 3.8 Form C",
                    url: alt.baseUrl + 'proyek/teknis/list'
                },
                usrTeknisUpload:{
                    usergroups: [1,7],
                    label: "Upload Lembar Pengesahan Produk Enjiniring - PE PLNE 3.8 Form C setelah ttd MS",
                    url: alt.baseUrl + 'proyek/teknis/list'
                },
                usrTeknisQC:{
                    usergroups: [1,6],
                    label: "Pemeriksaan oleh Tim QC PE PLNE 3.17 Form A",
                    url: alt.baseUrl + 'proyek/teknis/list'
                },
                usrTeknisRevisi:{
                    usergroups: [1,7],
                    label: "Revisi Draft Dokumen Catatan hasil QC (PTL)",
                    url: alt.baseUrl + 'proyek/teknis2/list'
                },
                usrTeknisQCPass:{
                    usergroups: [1,6],
                    label: "Penerbitan QC Pas (QC)",
                    url: alt.baseUrl + 'proyek/teknis2/list'
                },
                usrTeknisMSLap:{
                    usergroups: [1,3],
                    label: "Penerbitan/Approval Laporan Pemeriksaan Teknis (MS) PE PLNE 3.8 Form B",
                    url: alt.baseUrl + 'proyek/teknis2/list'
                },
                usrTeknisUploadMS:{
                    usergroups: [1,7],
                    label: "Penerbitan/Approval Laporan Pemeriksaan Teknis (MS) PE PLNE 3.8 Form B",
                    url: alt.baseUrl + 'proyek/teknis3/list'
                }
            },
            final:{
                usrFinalCovering:{
                    usergroups: [1,7],
                    label: "Penyiapan &  Upload Covering Letter -> Penyerahan Produk (PTL)",
                    url: alt.baseUrl + 'proyek/produk/list'
                },
                usrFinalUser:{
                    usergroups: [1,7],
                    label: "Input Hasil Pemeriksaan Produk oleh Pemberi Kerja (PTL)",
                    url: alt.baseUrl + 'proyek/produk/list'
                }
            },
            ba:{
                usrBAPP:{
                    usergroups: [13],
                    label: "Penyiapan BAPP",
                    url: alt.baseUrl + 'proyek/ba/list'
                },
                usrBAPPPTL:{
                    usergroups: [7],
                    label: "Persetujuan BAPP (PTL)",
                    url: alt.baseUrl + 'proyek/ba/list'
                },
                usrBAPPAdkon:{
                    usergroups: [17],
                    label: "Pemberitahuan BAPP Terbit",
                    url: alt.baseUrl + 'proyek/ba/list'
                }
            },
            casubmission:{
                casubmissionMS:{
                    usergroups: [3],
                    label: "Cash Advance Submission Persetujuan MS",
                    url: alt.baseUrl + 'purchasing/list'
                },
                casubmissionDIR:{
                    usergroups: [2],
                    label: "Cash Advance Submission Persetujuan DIR",
                    url: alt.baseUrl + 'purchasing/list'
                },
                casubmissionRejectPTL:{
                    usergroups: [7],
                    label: "Cash Advance Submission Reject",
                    url: alt.baseUrl + 'purchasing/list'
                }
            },
            casettlement:{
                casettlementPTL:{
                    usergroups: [7],
                    label: "Cash Advance Settlement Submit PTL",
                    url: alt.baseUrl + 'settlement/list'
                },
                casettlementMS:{
                    usergroups: [3],
                    label: "Cash Advance Settlement Persetujuan MS",
                    url: alt.baseUrl + 'settlement/list'
                },
                casettlementDIR:{
                    usergroups: [2],
                    label: "Cash Advance Settlement Persetujuan DIR",
                    url: alt.baseUrl + 'settlement/list'
                },
                casettlementRejectPTL:{
                    usergroups: [7],
                    label: "Cash Advance Settlement Reject",
                    url: alt.baseUrl + 'settlement/list'
                }
            },
            expense:{
                expenseMS:{
                    usergroups: [3,22],
                    label: "Expense Persetujuan MS",
                    url: alt.baseUrl + 'expense/list'
                },
                expenseDIR:{
                    usergroups: [2],
                    label: "Expense Persetujuan DIR",
                    url: alt.baseUrl + 'expense/list'
                },
                expenseRejectPTL:{
                    usergroups: [7],
                    label: "Expense Reject",
                    url: alt.baseUrl + 'expense/list'
                }
            },
            timesheet:{
                approvalPTL:{
                    usergroups: [7],
                    label: "Timesheet Persetujuan PTL",
                    url: alt.baseUrl + 'proyek/timesheet/approval'
                },
                approvalMadkon:{
                    usergroups: [17],
                    label: "Timesheet Persetujuan MAdkon",
                    url: alt.baseUrl + 'proyek/timesheet/approval'
                },
                approvalMEng:{
                    usergroups: [4],
                    label: "Timesheet Persetujuan Man Eng",
                    url: alt.baseUrl + 'proyek/timesheet/approval'
                }
            },
            desainreview:{
                projectadmin:{
                    usergroups: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                    label: "Desain Review Project Admin",
                    url: alt.baseUrl + 'proyek/desainawalkontraktor/list'
                },
                PTL:{
                    usergroups: [7],
                    label: "Desain Review PTL",
                    url: alt.baseUrl + 'proyek/desainawalkontraktor/list'
                },
                Enjinir:{
                    usergroups: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                    label: "Desain Review Enjiniir",
                    url: alt.baseUrl + 'proyek/desainawalkontraktor/list'
                }
            },
            revisiTimPro:{
                approvalMan:{
                    usergroups: [1,4],
                    label: "Approval Revisi Tim Proyek (Manajer Enjiniring)",
                    url: alt.baseUrl + 'proyek/timpro/revisitimpro'
                },
                approvalMS:{
                    usergroups: [1,3],
                    label: "Approval Revisi Tim Proyek (Manajer Senior)",
                    url: alt.baseUrl + 'proyek/timpro/revisitimpro'
                },
                uploadRevSkTim:{
                    usergroups: [1,9],
                    label: "Upload Revisi SK Tim Proyek",
                    url: alt.baseUrl + 'proyek/timpro/skrevisitimpro?isuploadsk=true'
                },
                approvalDir:{
                    usergroups: [1,2],
                    label: "Approval Revisi Tim Proyek",
                    url: alt.baseUrl + 'proyek/timpro/revisitimpro'
                }
            }
        };




        // $notification.get();

        $scope.moment = moment;
        $scope.breadcrumb = {
            data: [{
                title: 'Dashboard'
            }, {
                title: 'Administrasi',
                url: alt.baseUrl + 'dashboard/administrasi',
                isactive: true
            }]
        };
        $scope.toolbar = {
            title: 'Dashboard',
            description: 'Selamat datang ' + ($auth.userdata.name || '') + ' di ' + alt.description
        };

        $scope.tahap1 = {
            color: 'blue',
            icon: 'fa fa-comment',
            data:{
                nama: 'Tahap Aktivasi Cubicle',
                jumlah: 0
            }
        };
        $scope.tahap2 = {
            color: 'red',
            icon: 'fa fa-bar-chart-o',
            data:{
                nama: 'Tim Proyek',
                jumlah: 0
            }
        };
        $scope.tahap3 = {
            color: 'green',
            icon: 'fa fa-shopping-cart',
            data:{
                nama: 'Daftar Pemeriksaan Desain',
                jumlah: 0
            }
        };
        $scope.tahap4 = {
            color: 'yellow',
            icon: 'fa fa-globe',
            data:{
                nama: 'Monitoring Dan Laporan',

            }
        };

        $scope.filter = {};
        $scope.btnsearch = $button('search', {
            class: 'btn btn-primary',
            onclick: function(){
                for(var i = 1; i <= 5; i++){
                    $scope['chart' + i].reload();
                }
            }
        });

        $scope.peta = {};
        $scope.counter = {
            data: {
                aktif: 11,
                batal: 3,
                selesai: 78
            }
        };
        $scope.peruwp = {
            data:{}
        };

        //get data
        Activiti_Task.count({definitionKey : 'usrReview'}).then(function(response){
            if(!isNaN(response.data)) {
                $scope.tahap1.data.jumlah = response.data;
                $scope.tahap1.data.url = alt.baseUrl + 'praproyek/aktivasi/list';
            }
        });
        Activiti_Task.count({definitionKey : '%Survey'} ).then(function(response){
            if(!isNaN(response.data)) {
                $scope.tahap2.data.jumlah = response.data;
                $scope.tahap2.data.url = alt.baseUrl + 'praproyek/timpro/list';
            }
        });



        Activiti_Task.count({definitionKey : 'usrKualitas%'}).then(function(response){
            if(!isNaN(response.data)) {
                $scope.tahap3.data.jumlah = response.data;
                $scope.tahap3.data.url = alt.baseUrl + 'praproyek/dpd/list';
            }
        });



        Activiti_Task.count({definitionKey : 'usr%'}).then(function(response){
            if(!isNaN(response.data)) {
                $scope.tahap4.data.jumlah = response.data;
                $scope.tahap4.data.url = alt.baseUrl + 'monitoring/list';
            }
        });


        $scope.$watch('filter',function(val){
            for(var i = 1; i <= 5; i++){
                $scope['chart' + i].filter = {tahun: $scope.filter.tahun ? moment($scope.filter.tahun).format('YYYY') : '0000'};
            }
        },true);

        // dashboard chart
        $scope.chart1 = {};
        $scope.chart2 = {};
        $scope.chart3 = {};
        $scope.chart4 = {};
        $scope.chart5 = {};
        $scope.chart6 = {};
        $scope.chart7 = {};
        $scope.chart8 = {};
    }];
});