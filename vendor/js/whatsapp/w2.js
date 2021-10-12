const wwsWidget = {

    isPopupOpen: function() {
        return ( jQuery( '.wws-popup' ).attr( 'data-wws-popup-status' ) == '1' ) ? true : false; 
    },

    /*
     * Auto popup 
     */
    autoPopup: function( delayInSeconds ) {
        if ( 'yes' !== sessionStorage.wwsAutoPopup ) {
            if ( false === this.isPopupOpen() ) {
                setTimeout( function() {
                    wwsWidget.trigger();
                    sessionStorage.wwsAutoPopup = 'yes';
                }, Number( delayInSeconds * 1000 ) );
            }
        }
    },

    /*
     * Send message
     */
    sendMessage: function( message = '', whatsappNumber = '' ) {
        if ( '' === message || '' === whatsappNumber) {
            return false;
        }
        if ( this.is_mobile.any() ) {
            window.open( wwsObj.whatsapp_mobile_api + '/send?phone=' + whatsappNumber + '&text=' + message + '');
        } else {
            window.open( wwsObj.whatsapp_desktop_api + '/send?phone=' + whatsappNumber + '&text=' + message + '');
        }

        jQuery( document.body ).trigger( 'wws_message_sent' );

        return true;
    },

    /*
     * Send group invitation
     */
    sendGroupInvitation: function( groupID ) {
        window.open('https://chat.whatsapp.com/' + groupID );
    },

    /* 
     * Mobile detection
     */
    is_mobile: {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return ( wwsWidget.is_mobile.Android() || wwsWidget.is_mobile.BlackBerry() || wwsWidget.is_mobile.iOS() || wwsWidget.is_mobile.Opera() || wwsWidget.is_mobile.Windows());
        },
    },

    logAnalytics: function( message = 'N/A', number = 'N/A' ) {
        jQuery.ajax({
            url: wwsObj.admin_url,
            type: 'post',
            data: {
                'action':   'wws_click_analytics',
                'message':  message,
                'number':   number,
            }
        });
    },
}

;(function( $ ) {
    "use strict";

    jQuery( document ).ready(function() {

        // Google and Facebook Pixel Analytics
        function wws_google_click_analytics() {

            var fbGaAnalytics = jQuery.parseJSON( wwsObj.fb_ga_click_tracking );

            if ( fbGaAnalytics.ga_click_tracking_status == 1 ) {

                try {
                    gtag( 
                        'event', 
                        fbGaAnalytics.ga_click_tracking_event_name, {
                            'event_category': fbGaAnalytics.ga_click_tracking_event_category,
                            'event_label': fbGaAnalytics.ga_click_tracking_event_label,
                        } 
                    );
                } catch ( error ) {
                    if ( 'yes' === wwsObj.is_debug ) {
                        window.console && console.log( 'WordPress WhatsApp Support Google or Facebook analytics error message: ' + error.message );
                    }
                }
                
                try {
                    ga( 
                        'send', 
                        'event', 
                        fbGaAnalytics.ga_click_tracking_event_category, 
                        fbGaAnalytics.ga_click_tracking_event_name, 
                        fbGaAnalytics.ga_click_tracking_event_label
                    );
                } catch ( error ) {
                    if ( 'yes' === wwsObj.is_debug ) {
                        window.console && console.log( 'WordPress WhatsApp Support Google or Facebook analytics error message: ' + error.message );
                    }
                }
                
                try {
                    _gaq.push([ 
                        '_trackEvent', 
                        fbGaAnalytics.ga_click_tracking_event_category, 
                        fbGaAnalytics.ga_click_tracking_event_name, 
                        fbGaAnalytics.ga_click_tracking_event_label 
                    ]);
                }
                catch ( error ) {
                    if ( 'yes' === wwsObj.is_debug ) {
                        window.console && console.log( 'WordPress WhatsApp Support Google or Facebook analytics error message: ' + error.message );
                    }
                }
                
                try {
                    dataLayer.push({
                        'event': 'customEvent',
                        'eventCategory': fbGaAnalytics.ga_click_tracking_event_category,
                        'eventAction': fbGaAnalytics.ga_click_tracking_event_name,
                        'eventLabel': fbGaAnalytics.ga_click_tracking_event_label
                    });
                }
                catch ( error ) {
                    if ( 'yes' === wwsObj.is_debug ) {
                        window.console && console.log( 'WordPress WhatsApp Support Google or Facebook analytics error message: ' + error.message );
                    }
                }
            }

            if ( fbGaAnalytics.fb_click_tracking_status == 1 ) {
                var FBpixeled = false;
                try {
                    if ( ! FBpixeled ) {
                        fbq( 'trackCustom', 'WordPressWhatsAppSupport', {
                            event: fbGaAnalytics.fb_click_tracking_event_name,
                            account: fbGaAnalytics.fb_click_tracking_event_label
                        });
                        FBpixeled = true;
                    }
                }
                catch ( error ) {
                    if ( 'yes' === wwsObj.is_debug ) {
                        window.console && console.log( 'WordPress WhatsApp Support Google or Facebook analytics error message: ' + error.message );
                    }
                }
            }
        }

        function isGDPRChecked() {
            if ( 'yes' !== wwsObj.is_gdpr ) {
                return;
            }

            if ( jQuery('.wws-gdpr input').is(':checked') == false ) {
                jQuery( '.wws-gdpr > div' ).addClass('wws-shake-animation');
                setTimeout( function() { 
                    jQuery( '.wws-gdpr > div' ).removeClass('wws-shake-animation');
                }, 300 );
                return false;
            } else {
                return true;
            }
        }

        // Open and close the wws popup
        jQuery( '.wws-popup__open-btn, .wws-popup__close-btn' ).on('click', function(event) {
            event.preventDefault();
            wwsWidget.trigger();
        });


        // send message
        jQuery( document ).on('click', '.wws-popup__send-btn', function(event) {
            event.preventDefault();

            // If popup template is 8th
            if ( wwsObj.popup_layout == 8 ) {
                var preMessage      = jQuery( this ).attr( 'data-wws-pre-msg' );
                var whatsappNumber  = jQuery( this ).attr( 'data-wws-number' );

                if ( isGDPRChecked() == false ) return;

                if ( '' === preMessage ) {
                    preMessage = '%20';
                }

                if( wwsWidget.sendMessage( preMessage, whatsappNumber ) == true ) {   
                    wwsWidget.logAnalytics( preMessage );
                    wws_google_click_analytics();
                }
            }
            
            // If popup template is 7th
            if ( wwsObj.popup_layout == 7 ) {

                var message         = jQuery( '.wws-popup__input' ).val();
                var number          = jQuery( '.wws-popup__fields-number' ).val();
                var whatsappNumber  = wwsObj.support_number;

                if ( isGDPRChecked() == false ) return;

                setTimeout( function() {
                    jQuery( '.wws-popup__fields-textarea-wrapper, .wws-popup__fields-number' ).removeClass( 'wws-shake-animation' );
                }, 300 );

                if ( number == '' ) {
                    jQuery( '.wws-popup__fields-number' ).addClass( 'wws-shake-animation' );
                    return;
                }
                if ( message == '' ) {
                    jQuery( '.wws-popup__fields-textarea-wrapper' ).addClass( 'wws-shake-animation' );
                    return;
                }
                if( wwsWidget.sendMessage( ( message + wwsObj.pre_defined_text ), whatsappNumber ) == true ) {
                    wwsWidget.logAnalytics( message, number );
                }

            }

            if ( wwsObj.popup_layout == 6 ) {

                var message         = jQuery( '.wws-popup__input' ).val();
                var preMessage      = jQuery( '.wws-popup-multi-support-pre-essage' ).val();
                var number          = jQuery( '.wws-popup__fields-number' ).val();
                var whatsappNumber  = jQuery( '.wws-popup-multi-support-number' ).val();

                if ( isGDPRChecked() == false ) return;

                setTimeout( function() {
                    jQuery( '.wws-popup__fields-textarea-wrapper, .wws-popup__fields-number' ).removeClass( 'wws-shake-animation' );
                }, 300 );

                if ( number == '' ) {
                    jQuery( '.wws-popup__fields-number' ).addClass( 'wws-shake-animation' );
                    return;
                }

                if ( message == '' ) {
                    jQuery( '.wws-popup__fields-textarea-wrapper' ).addClass( 'wws-shake-animation' );
                    return;
                }

                if( wwsWidget.sendMessage( ( message + preMessage ), whatsappNumber ) == true ) {
                    
                    wwsWidget.logAnalytics( message, number );

                }

            }

            // if popup template is 1st, 2nd, or 3rd
            if ( wwsObj.popup_layout == 1 || wwsObj.popup_layout == 2 || wwsObj.popup_layout == 3 ) {

                var message         = jQuery( '.wws-popup__input' ).val();
                var whatsappNumber  = wwsObj.support_number;

                if ( isGDPRChecked() == false ) return;

                setTimeout( function() {
                    jQuery( '.wws-popup__input-wrapper' ).removeClass( 'wws-shake-animation' );
                }, 300 );

                if ( 0 == message.length ) {
                    jQuery( '.wws-popup__input-wrapper' ).addClass( 'wws-shake-animation' );
                    return;
                }
                if ( wwsWidget.sendMessage( ( message + wwsObj.pre_defined_text ), whatsappNumber ) == true ) {
                    wwsWidget.logAnalytics( message );
                    wws_google_click_analytics();
                }
            } 

            // if popup template is 4th
            if ( wwsObj.popup_layout == 4 ) {

                var message         = jQuery( '.wws-popup__input' ).val();
                var whatsappNumber  = wwsObj.support_number;

                if( wwsWidget.sendMessage( ( message + wwsObj.pre_defined_text ), whatsappNumber ) == true ) {
                    wwsWidget.logAnalytics();
                    wws_google_click_analytics();
                }
            }

        });

        // Hit enter to send a message.
        jQuery('.wws-popup__input').on( 'keypress', function (e) {
            var key = e.which;

            if(key == 13) { // the enter key code
                jQuery('.wws-popup__send-btn').click();
                return false;  
            }
        });

        // Group invitation
        jQuery( '.wws-popup-group-invitation__button' ).on( 'click', function() {
            wwsWidget.sendGroupInvitation( wwsObj.group_invitation_id );
            wwsWidget.logAnalytics();
            wws_google_click_analytics()
        });

        // autoPopup
        if ( 'yes' === wwsObj.auto_popup ) {
            wwsWidget.autoPopup( wwsObj.auto_popup_time );
        }

        // popup button display by scroll lenght
        if ( wwsObj.scroll_lenght != null ) {

            jQuery(document).on( 'scroll', function () {
                var y = jQuery(window).scrollTop() + jQuery(window).height();
                var documentHeight = jQuery(document).height() * wwsObj.scroll_lenght / 100;

                if ( y >= documentHeight - 10 ) {
                    jQuery('.wws-popup-container').fadeIn();
                } else {
                    jQuery('.wws-popup-container').fadeOut();
                }
            });
        }

        // Layout 6 - open selected support person.
        jQuery( document ).on( 'click', '[data-wws-multi-support-person-id]', function() { 
            var multiSupportPersonID = jQuery( this ).attr( 'data-wws-multi-support-person-id' );
            
            jQuery( '.wws-popup__support-person-wrapper' ).hide();
            jQuery( '.wws-popup__support-person-form' ).show();
            jQuery( '.wws-popup__support-person-form' ).html( wwsLoader );

            jQuery.ajax({
                url: wwsObj.admin_url,
                type: 'post',
                data: {
                    'action':   'wws_view_multi_person_form',
                    'support_person_id': multiSupportPersonID,
                    'post_id' : wwsObj.current_page_id,
                }
            }).done(function( response ) {
                jQuery( '.wws-popup__support-person-form' ).html( response );
                if ( ''  !== wwsObj.numberMasking) {
                    jQuery( '.wws-popup__fields-number' ).mask( wwsObj.numberMasking );
                }
            });
            
        } );
        

        // Layout 6 - close selected support person.
        jQuery( document ).on( 'click', '[data-wws-multi-support-back]', function() {
            jQuery( '.wws-popup__support-person-wrapper' ).show();
            jQuery( '.wws-popup__support-person-form' ).hide();
        } );

        // Mobile number masking
        if ( ''  !== wwsObj.numberMasking) {
            jQuery( '.wws-popup__fields-number' ).mask( wwsObj.numberMasking );
        }

    }); // Document ready end here.

})(jQuery)