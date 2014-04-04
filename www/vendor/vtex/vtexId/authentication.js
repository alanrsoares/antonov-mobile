var vtexid = function() {
    var endpoint = null, resources = "//io.vtex.com.br/vtex-id-ui/2.1.25/", utils = {}, actions = {}, active = false, alreadyLoaded = false;
    activePage = null, returnUrl = null, email = null, scope = null, scopeName = null,
        locale = null, canClose = true, isMobile = false, flow = "login", container = null,
        forceReload = false, title = null, startParams = null;
    actions.defaultTasks = function() {
        actions.getLang();
        utils.listenAjaxErrors();
        utils.checkUrlParams();
    };
    actions.close = function() {
        $("#vtexIdContainer").remove();
        $(".vtex-modal-backdrop").remove();
        active = false;
    };
    actions.getLang = function() {
        if (window.vtex && vtex.i18n && vtex.i18n.getLocale) {
            locale = vtex.i18n.getLocale();
        } else if (window.vtex && window.vtex.locale) {
            locale = window.vtex.locale;
        } else {
            locale = "pt-BR";
        }
    };
    actions.logout = function(loadJqueryCookie, _scope) {
        actions.updateEndpoint();
        $.ajax({
            url: endpoint + "/vtexid/pub/logout",
            data: {
                scope: _scope
            },
            dataType: "jsonp",
            type: "GET"
        }).done(function(data) {
            $.removeCookie(data.cookieName, {
                path: "/"
            });
            window.location.reload(true);
        });
    };
    actions.start = function(options) {
        if (!active) {
            returnUrl = options.returnUrl || window.location.href;
            email = options.userEmail || null;
            scope = scope ? scope : options.scope || null;
            scopeName = scopeName ? scopeName : options.scopeName || null;
            locale = options.locale || locale;
            forceReload = options.forceReload || false;
            flow = options.flow || "login";
            title = options.title || undefined;
            container = options.container || null;
            canClose = options.canClose === false ? options.canClose : true;
            isMobile = actions.detectmob();
            actions.updateEndpoint();
            actions.preLoader(true);
            $.ajax({
                url: endpoint + "/vtexid/pub/authentication/start",
                data: {
                    callbackUrl: window.location.href,
                    authStartPoint: window.location.href,
                    scope: scope,
                    user: email,
                    locale: locale
                },
                type: "GET",
                dataType: "jsonp"
            }).done(function(data) {
                if (data.authCookie && scope == null && flow == "login") {
                    if ($.cookie(data.authCookie.Name) !== data.authCookie.Value) {
                        actions.backToApplication(true, data.authCookie);
                    } else {
                        vtexid.close();
                    }
                } else {
                    actions.onStart(data);
                }
            });
        }
        actions.onStart = function(data) {
            startParams = data;
            if (!alreadyLoaded) {
                alreadyLoaded = true;
                actions.applicationLoader();
            } else {
                actions.createBaseModal();
            }
        };
        if (!active) {
            active = true;
        }
    };
    actions.detectmob = function() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        } else {
            return false;
        }
    };
    actions.preLoader = function(status) {
        if (status) {
            var $loader = $("<div>").css({
                width: "100%",
                height: "100%",
                position: "fixed",
                zIndex: 999,
                background: '#fff no-repeat center center url("data:image/gif;base64,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")',
                top: 0,
                left: 0
            }).attr("id", "vtexidBaseLoader");
            if (container) {
                $loader.css("position", "absolute").appendTo(container);
            } else {
                $("body").append($loader);
            }
        } else {
            $("#vtexidBaseLoader").remove();
        }
    };
    actions.applicationLoader = function() {
        $.getScript(resources + "libs/headjs/head.load.min.js").done(function() {
            head.ready(function() {
                var scriptsResources = [];
                if (!window.angular) {
                    scriptsResources.push({
                        angular: resources + "libs/angular/angular.min.js"
                    });
                }
                scriptsResources.push({
                    libsTemplate: resources + "scripts/libs-templates.min.js"
                });
                scriptsResources.push({
                    angularApp: resources + "scripts/angular-app.min.js"
                });
                if (!window.i18n) {
                    scriptsResources.push({
                        i18n: resources + "libs/i18next/i18next-1.7.1.min.js"
                    });
                }
                head.load(resources + "styles/app.min.css");
                head.load(scriptsResources, function() {
                    actions.createBaseModal();
                });
            });
        });
    };
    actions.startAngularApp = function() {
        actions.preLoader(false);
        angular.bootstrap($("#vtexIdContainer"), [ "vtexidApplication" ]);
    };
    actions.createBaseModal = function() {
        var $template = $.parseHTML(vtexid.templates.template);
        var $container = $("<div>").attr("id", "vtexIdContainer").on("click", ".dead-link", function(evt) {
            evt.preventDefault();
        }).append($(vtexid.templates.container));
        if (container) {
            $container.addClass("vtexId-app").appendTo(container);
        } else {
            $container.addClass("vtexId-modal-app").css("top", $("body", "html").scrollTop() + 70).appendTo("body");
            $("<div>").addClass("vtex-modal-backdrop").appendTo("body").show();
        }
        if (canClose) {
            $container.on("click", ".vtexIdUI-close", function() {
                vtexid.close();
            });
        }
        $("#vtexIdUI-main-content").append($template);
        actions.starti18n();
        actions.startAngularApp();
    };
    actions.starti18n = function() {
        var option = {
            lng: locale,
            async: true,
            load: "current",
            fallbackLng: false,
            customLoad: function(lng, ns, options, loadComplete) {
                head.js({
                    localeFile: resources + "locales/" + lng + ".js"
                }, function() {
                    var data = languageObj;
                    window.vtex = window.vtex || {};
                    window.vtex.i18n = vtex.i18n || {};
                    window.vtex.i18n[lng] = vtex.i18n[lng] || {};
                    vtex.i18n[options.lng].vtexid = data;
                    loadComplete(null, vtex.i18n[lng]);
                });
            }
        };
        i18n.init(option).done(function() {
            $("#vtexIdContainer").i18n();
        });
    };
    actions.backToApplication = function(auth, cookie) {
        if (auth) {
            actions.setAuthCookie(cookie.Name, cookie.Value, function() {
                $(window).trigger("successAuth");
            });
        } else {
            $(window).trigger("errorAuth");
        }
        vtexid.close();
        if (forceReload) {
            location.reload(false);
        } else if (returnUrl) {
            window.location.href = returnUrl;
        }
    };
    actions.setAuthCookie = function(name, value, callback) {
        var limiter = "==", index = value.indexOf(limiter);
        value = value.substring(0, index != -1 ? index + limiter.length : value.length);
        $.cookie.raw = true;
        $.cookie(name, value, {
            path: "/"
        });
        var cookieObj = {
            name: name,
            value: value
        };
        vtexid.setCookieData(cookieObj);
        if (callback) {
            callback();
        }
    };
    actions.updateEndpoint = function() {
        var _host = window.location.host.replace("vtexlocal", "vtexcommercestable");
        endpoint = scope ? "https://" + _host + "/api" : "https://vtexid.vtex.com.br/api";
    };
    utils.checkUrlParams = function() {
        var regexCheckAdmin = new RegExp("/admin/", "g"), qsParams = utils.getQSParams(window.location.href), _returnUrl = qsParams.returnUrl ? qsParams.returnUrl : window.location.href, _email = qsParams.email ? qsParams.email : null;
        if (qsParams.authStatus == "forgotPswd") {
            actions.start({
                scope: scope,
                returnUrl: _returnUrl,
                userEmail: _email,
                locale: locale,
                forceReload: true,
                canClose: false,
                flow: "changePswd"
            });
        }
        if (window.location.href.match(regexCheckAdmin)) {
            scope = null;
        }
    };
    utils.getQSParams = function(url) {
        var vars = {}, hash;
        var hashes = url.slice(url.indexOf("?") + 1);
        hashes = hashes.split("&");
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split("=");
            var keyQs = decodeURIComponent(hash[0]), valueQs = decodeURIComponent(hash[1]), sep, indexOfSep;
            if (keyQs == "authCookieValue") {
                sep = "==";
                indexOfSep = valueQs.indexOf(sep);
                valueQs = valueQs.substring(0, indexOfSep != -1 ? indexOfSep + sep.length : valueQs.length);
            }
            if (keyQs == "email") {
                var formatedEmail = valueQs.split("/#/");
                valueQs = formatedEmail[0];
            }
            if (keyQs == "authToken" || keyQs == "emailSent" || keyQs == "authStatus") {
                sep = "#";
                indexOfSep = valueQs.indexOf(sep);
                valueQs = valueQs.substring(0, indexOfSep != -1 ? indexOfSep : valueQs.length);
            }
            vars[keyQs] = decodeURIComponent(valueQs);
        }
        return vars;
    };
    utils.listenAjaxErrors = function() {
        $(document).ajaxError(function(event, jqXHR) {
            if (jqXHR.status == 401 || jqXHR.status == 403) {
                var __obj = {
                    scope: scope,
                    returnUrl: window.location.href,
                    forceReload: true,
                    canClose: false,
                    flow: jqXHR.status == 401 ? "login" : "logout"
                };
                actions.start(__obj);
            }
        });
    };
    actions.defaultTasks();
    return {
        getScope: function() {
            return scope;
        },
        setScope: function(value) {
            scope = value;
        },
        getScopeName: function() {
            return scopeName;
        },
        setScopeName: function(value) {
            scopeName = value;
        },
        getLocale: function() {
            return locale;
        },
        setLocale: function(value) {
            locale = value;
        },
        getEndpoint: function() {
            return endpoint;
        },
        getParams: function() {
            return {
                forceReload: forceReload,
                returnUrl: returnUrl,
                flow: flow,
                title: title,
                locale: locale,
                scope: scope,
                scopeName: scopeName,
                email: email,
                resources: resources,
                canClose: canClose,
                isMobile: isMobile,
                startParams: startParams
            };
        },
        getCookieData: function() {
            return cookieObj;
        },
        setCookieData: function(cookie) {
            cookieObj = cookie;
        },
        loading: function(status) {
            if (status) {
                $(".vtexIdUI-loading-modal").show();
            } else {
                $(".vtexIdUI-loading-modal").hide();
            }
        },
        version: "2.1.25",
        updatei18n: actions.starti18n,
        getQSParams: utils.getQSParams,
        close: actions.close,
        logout: actions.logout,
        backToApplication: actions.backToApplication,
        start: actions.start
    };
}();

(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else {
        e(jQuery);
    }
})(function(e) {
    function n(e) {
        return e;
    }
    function r(e) {
        return decodeURIComponent(e.replace(t, " "));
    }
    function i(e) {
        if (e.indexOf('"') === 0) {
            e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        }
        try {
            return s.json ? JSON.parse(e) : e;
        } catch (t) {}
    }
    var t = /\+/g;
    var s = e.cookie = function(t, o, u) {
        if (o !== undefined) {
            u = e.extend({}, s.defaults, u);
            if (typeof u.expires === "number") {
                var a = u.expires, f = u.expires = new Date();
                f.setDate(f.getDate() + a);
            }
            o = s.json ? JSON.stringify(o) : String(o);
            return document.cookie = [ s.raw ? t : encodeURIComponent(t), "=", s.raw ? o : encodeURIComponent(o), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : "" ].join("");
        }
        var l = s.raw ? n : r;
        var c = document.cookie.split("; ");
        var h = t ? undefined : {};
        for (var p = 0, d = c.length; p < d; p++) {
            var v = c[p].split("=");
            var m = l(v.shift());
            var g = l(v.join("="));
            if (t && t === m) {
                h = i(g);
                break;
            }
            if (!t) {
                h[m] = i(g);
            }
        }
        return h;
    };
    s.defaults = {};
    e.removeCookie = function(t, n) {
        if (e.cookie(t) !== undefined) {
            e.cookie(t, "", e.extend({}, n, {
                expires: -1
            }));
            return true;
        }
        return false;
    };
});

angular.module("vtexIdInterceptor", []).factory("vtexIdInterceptor", function($q) {
    return {
        responseError: function(rejection) {
            if (rejection.status === 401 || rejection.status === 403) {
                var __flow = rejection.status == 401 ? "login" : "logout";
                vtexid.start({
                    returnUrl: window.location.href,
                    locale: window.vtex.locale,
                    forceReload: true,
                    canClose: false,
                    flow: __flow
                });
            }
            return $q.reject(rejection);
        }
    };
});