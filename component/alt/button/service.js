define([], function () {
    alt.modules.button = alt.factory('$button', ['$log', '$i18n', function($log, $i18n) {
        return function (type, data) {
            type = type || '';
            data = data || {};

            var buttons = {
                'login': {
                    'title': 'Login',
                    'title_clicked': 'Logging in...',
                    'description': 'Login',
                    'icon': '',
                    'onclick': angular.noop,
                    'href': '',
                    'class': 'btn btn-primary btn-large btn-block',
                    'type': 'submit',
                    'style': 'width: 100%;',
                    'disabled': false
                },
                'excel': {
                    'title': 'Excel',
                    'description': 'Download Excel',
                    'icon': 'fa fa-cloud-download',
                    'onclick': angular.noop,
                    'href': '',
                    'class': 'btn btn-info hidden-xs',
                    'disabled': false
                },
                'download': {
                    'title': 'Download',
                    'description': 'Download',
                    'icon': 'fa fa-cloud-download',
                    'onclick': angular.noop,
                    'href': '',
                    'class': 'btn btn-info hidden-xs',
                    'disabled': false
                },
                'reset': {
                    'title': 'Reset',
                    'description': 'Reset',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-refresh',
                    'class': 'btn btn-warning',
                    'disabled': false
                },
                'reload': {
                    'title': 'Reload',
                    'description': 'Reload',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-rotate-left',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'add': {
                    'title': 'Tambah',
                    'description': 'Tambah',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-plus',
                    'class': 'btn btn-danger',
                    'disabled': false
                },
                'integrasi': {
                    'title': 'Integrasi',
                    'description': 'Integrasi ke SAP',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-plus',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'sub': {
                    'title': 'Kurang',
                    'description': 'Kurang',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-minus-sign',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'back': {
                    'title': $i18n('Kembali'),
                    'description': 'Kembali',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-arrow-left',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'save': {
                    'title': 'Simpan',
                    'description': 'Simpan',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-check',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'print': {
                    'title': 'Print',
                    'description': 'Print',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-print',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'email': {
                    'title': 'Email',
                    'description': 'Email',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-envelope',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'view': {
                    'title': 'Lihat',
                    'description': 'Lihat',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-eye',
                    'class': 'btn btn-info',
                    'disabled': false,
                    'style': 'background-color:#45b6af;border-color:#3ea49d'
                },
                'edit': {
                    'title': 'Edit',
                    'description': 'Edit',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-edit',
                    'class': 'btn btn-warning',
                    'disabled': false
                },
                'remove': {
                    'title': 'Hapus',
                    'description': 'Hapus',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-trash',
                    'class': 'btn btn-danger',
                    'disabled': false
                },
                'yes': {
                    'title': 'Ya',
                    'description': 'Ya',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-check',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'no': {
                    'title': 'Tidak',
                    'description': 'Tidak',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-remove',
                    'class': 'btn btn-danger',
                    'disabled': false
                },
                'cancel': {
                    'title': 'Batal',
                    'description': 'Batal',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-close',
                    'class': 'btn btn-danger',
                    'disabled': false
                },
                'approve': {
                    'title': 'Approve',
                    'description': 'Approve',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-check',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'reject': {
                    'title': 'Reject',
                    'description': 'Reject',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-remove',
                    'class': 'btn btn-danger',
                    'disabled': false
                },
                'search': {
                    'title': 'Cari',
                    'description': 'Cari',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-search',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'filter': {
                    'title': 'Filter',
                    'description': 'Cari',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-search',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'preview': {
                    'title': 'Preview',
                    'description': 'Preview',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-file-text-alt',
                    'class': 'btn btn-info',
                    'disabled': false
                },
                'open': {
                    'title': 'Buka',
                    'description': 'Buka',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-folder-open',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'close': {
                    'title': 'Tutup',
                    'description': 'Tutup',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-close',
                    'class': 'btn btn-danger',
                    'disabled': false
                },
                'next': {
                    'title': 'Berikutnya',
                    'description': 'Berikutnya',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': '',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'unlocked':{
                    'title': 'Enabled',
                    'description':'Enable',
                    'onclick':angular.noop,
                    'href':'',
                    'icon':'fa fa-unlock',
                    'class':'btn btn-success',
                    'disabled':false
                },
                'locked':{
                    'title': 'Disabled',
                    'description':'Disable',
                    'onclick':angular.noop,
                    'href':'',
                    'icon':'fa fa-lock',
                    'class':'btn btn-danger',
                    'disabled':false
                },
                'prev': {
                    'title': 'Sebelumnya',
                    'description': 'Sebelumnya',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': '',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'zoomin': {
                    'title': 'Zoom In',
                    'description': 'Zoom In',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': '',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'zoomout': {
                    'title': 'Zoom Out',
                    'description': 'Zoom Out',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': '',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'start': {
                    'title': 'Mulai',
                    'description': 'Mulai',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': '',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'finish': {
                    'title': 'Selesai',
                    'description': 'Selesai',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': '',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'choose': {
                    'title': 'Pilih',
                    'description': 'Pilih',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-check-square-o',
                    'class': 'btn btn-red',
                    'disabled': false
                },
                'unchoose': {
                    'title': '',
                    'description': '',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-square-o',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'up': {
                    'title': 'Naik',
                    'description': 'Naik',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-arrow-up',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'down': {
                    'title': 'Turun',
                    'description': 'Turun',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-arrow-down',
                    'class': 'btn btn-default',
                    'disabled': false
                },
                'generate': {
                    'title': 'Generate',
                    'description': 'Generate',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-cogs',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'billing': {
                    'title': 'Tagihan',
                    'description': 'Tagihan',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-money',
                    'class': 'btn btn-success',
                    'disabled': false
                },
                'invoice': {
                    'title': 'Tagihan',
                    'description': 'Tagihan',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-money',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'bast': {
                    'title': 'BAST',
                    'description': 'BAST',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-file-text',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'barcode': {
                    'title': 'Barcode',
                    'description': 'Barcode',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-barcode',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'qrcode': {
                    'title': 'QR code',
                    'description': 'QR code',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-qrcode',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'inventarisasi': {
                    'title': 'Inventarisasi',
                    'description': 'Inventarisasi',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-map-marker',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                'import': {
                    'title': 'Import',
                    'description': 'Import',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-download',
                    'class': 'btn btn-info',
                    'disabled': false
                },
                'finalize': {
                    'title': 'Finalisasi',
                    'description': 'Finalisasi',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-check',
                    'class': 'btn btn-success',
                    'disabled': false
                },
				'unlocked':{
					'title': 'Enabled',
					'description':'Enable',
					'onclick':angular.noop,
					'href':'',
					'icon':'fa fa-unlock',
					'class':'btn btn-success',
					'disabled':false
				},
				'locked':{
					'title': 'Disabled',
					'description':'Disable',
					'onclick':angular.noop,
					'href':'',
					'icon':'fa fa-lock',
					'class':'btn btn-danger',
					'disabled':false
				},
                'password': {
                    'title': 'Password',
                    'description': 'Password',
                    'onclick': angular.noop,
                    'href': '',
                    'icon': 'fa fa-key',
                    'class': 'btn btn-primary',
                    'disabled': false
                },
                '': {
                    'title': '',
                    'description': '',
                    'onclick': angular.noop,
                    'ondblclick': angular.noop,
                    'href': '',
                    'icon': '',
                    'style': '',
                    'disabled': false
                }
            };
            return alt.extend(buttons[type], data);
        };
    }]);
});