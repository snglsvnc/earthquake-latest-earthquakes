/* global define */
define ([
  'mvc/Util',
  './DefaultListFormatter',
  './Format'
], function(
  Util,
  DefaultListFormatter,
  Format
){
  'use strict';

  var DEFAULTS = {
    className: 'pager-list'
  };

  var PagerListFormatter = function (options) {
    DefaultListFormatter.apply(this, arguments);
    this._options = Util.extend({},DEFAULTS, options);
  };

  PagerListFormatter.prototype =
      Object.create(DefaultListFormatter.prototype);


  PagerListFormatter.prototype.getListClassName = function () {
    return this._options.className;
  };

  PagerListFormatter.prototype.generateListItemMarkup = function (item) {
    var markup = [],
        prefix = this._options.idprefix,
        settings = this._options.settings,
        p, c, highlightClass, alert, alertClass, mmi, mmiClass;

    p = item.properties;
    c = item.geometry.coordinates;
    highlightClass = '';

    if (p.alert !== null) {
      alert = p.alert.charAt(0).toUpperCase();
      alertClass = 'alert pager-alertlevel-' + p.alert;
    } else {
      alert = '&ndash;';
      alertClass = 'no-pager';
    }

    if (p.mmi !== null) {
      mmi = Format.mmi(p.mmi);
      mmiClass = 'intensity mmi' + mmi;
    } else {
      mmi = '&ndash;';
      mmiClass = 'no-intensity';
    }

    if (p.sig>= 600) {
      highlightClass = ' class="bigger"';
    } else if (p.mag >= 4.5) {
      highlightClass = ' class="big"';
    }

    markup.push(
    '<li id="', prefix, item.id, '"', highlightClass, '>',
      '<span class="',alertClass,'">',
        alert,
      '</span> ',
      '<span class="place">',
        p.title,
      '</span> ',
      '<span class="time"> ',
        Format.dateFromEvent(item, settings),
      '</span> ',
      '<span class = "maxintensity">Maximum Intensity:</span>',
      '<span class="',mmiClass,'">',
        mmi,
      '</span>',
    '</li>');

    return markup.join('');
  };

  return PagerListFormatter;
});