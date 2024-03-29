sap.ui.controller("zui5_ttg_app001.Product", {































































































































































































































































	navBack : function(sChannelId, sEventId, oData) {































































































































		sap.ui.getCore().getEventBus().publish(































































































































				"nav", 































































































































				"to", {































































































































				  viewName: "zui5_ttg_app001.Main",































































































































				  viewId: "Main"































































































































			});































































































































	},































































































































	































































































































/**































































































































* Called when a controller is instantiated and its View controls (if available) are already created.































































































































* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.































































































































* @memberOf zui5_ttg_app001.Product































































































































*/































































































































	onInit: function() {































































































































		































































































































		var that = this;































































































































		































































































































		this.getView().addEventDelegate({































































































































			onBeforeShow : jQuery.proxy(function(evt) {































































































































				this.onBeforeShow(evt);































































































































			}, this) });































































































































		































































































































		var productApp = this.getView().byId("ProductSplitApp");































































































































		































































































































		if (sap.ui.Device.system.phone)































































































































			productApp.setMode(sap.m.SplitAppMode.HideMode);































































































































		































































































































		if (productApp.getMasterPages().length > 0)































































































































			return;































































































































		































































































































		productApp.addMasterPage(sap.ui.xmlview("zui5_ttg_app001.ProductMaster", "zui5_ttg_app001.ProductMaster"));































































































































		productApp.addDetailPage(sap.ui.xmlview("zui5_ttg_app001.ProductDetail", "zui5_ttg_app001.ProductDetailEmpty"));































































































































		































































































































		productApp.toDetail("zui5_ttg_app001.ProductDetailEmpty");































































































































		productApp.toMaster("zui5_ttg_app001.ProductMaster");































































































































	},































































































































	































































































































	onBeforeShow	: function() {































































































































































































































































	},































































































































	































































































































	hideMaster	: function() {































































































































		this.getView().byId("ProductSplitApp").hideMaster();































































































































	},































































































































































































































































/**































































































































* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered































































































































* (NOT before the first rendering! onInit() is used for that one!).































































































































* @memberOf zui5_ttg_app001.Product































































































































*/































































































































//	onBeforeRendering: function() {































































































































//































































































































//	},































































































































































































































































/**































































































































* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.































































































































* This hook is the same one that SAPUI5 controls get after being rendered.































































































































* @memberOf zui5_ttg_app001.Product































































































































*/































































































































//	onAfterRendering: function() {































































































































//































































































































//	},































































































































































































































































/**































































































































* Called when the Controller is destroyed. Use this one to free resources and finalize activities.































































































































* @memberOf zui5_ttg_app001.Product































































































































*/































































































































//	onExit: function() {































































































































//































































































































//	}































































































































































































































































});