// ==UserScript==
// @name         KAYAK Plus!
// @namespace    http://davidpolitis.net/
// @author    	 David Politis
// @version      1.0
// @date         2017-03-14
// @description  Improves trip planning for KAYAK.
// @match        https://www.ca.kayak.com/trips/*/h/*
// @match        https://www.cn.kayak.com/trips/*/h/*
// @match        https://www.fi.kayak.com/trips/*/h/*
// @match        https://www.gr.kayak.com/trips/*/h/*
// @match        https://www.kayak.ae/trips/*/h/*
// @match        https://www.kayak.ch/trips/*/h/*
// @match        https://www.kayak.cl/trips/*/h/*
// @match        https://www.kayak.co.id/trips/*/h/*
// @match        https://www.kayak.co.in/trips/*/h/*
// @match        https://www.kayak.co.jp/trips/*/h/*
// @match        https://www.kayak.co.kr/trips/*/h/*
// @match        https://www.kayak.co.th/trips/*/h/*
// @match        https://www.kayak.co.uk/trips/*/h/*
// @match        https://www.kayak.com.ar/trips/*/h/*
// @match        https://www.kayak.com.au/trips/*/h/*
// @match        https://www.kayak.com.br/trips/*/h/*
// @match        https://www.kayak.com.co/trips/*/h/*
// @match        https://www.kayak.com.hk/trips/*/h/*
// @match        https://www.kayak.com.mx/trips/*/h/*
// @match        https://www.kayak.com.my/trips/*/h/*
// @match        https://www.kayak.com.pe/trips/*/h/*
// @match        https://www.kayak.com.tr/trips/*/h/*
// @match        https://www.kayak.com/trips/*/h/*
// @match        https://www.kayak.de/trips/*/h/*
// @match        https://www.kayak.dk/trips/*/h/*
// @match        https://www.kayak.es/trips/*/h/*
// @match        https://www.kayak.fr/trips/*/h/*
// @match        https://www.kayak.ie/trips/*/h/*
// @match        https://www.kayak.it/trips/*/h/*
// @match        https://www.kayak.nl/trips/*/h/*
// @match        https://www.kayak.no/trips/*/h/*
// @match        https://www.kayak.pl/trips/*/h/*
// @match        https://www.kayak.pt/trips/*/h/*
// @match        https://www.kayak.ru/trips/*/h/*
// @match        https://www.kayak.se/trips/*/h/*
// @match        https://www.kayak.sg/trips/*/h/*
// @match        https://www.nz.kayak.com/trips/*/h/*
// @match        https://www.tw.kayak.com/trips/*/h/*
// @copyright    2017+, David Politis
// @require      http://www.jacklmoore.com/js/autosize.min.js
// @require      https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // create link for trips email
    var tripsLink = document.createElement('a');
    var email = 'trips@' + window.location.hostname.substring(4);
    tripsLink.href = 'mailto:' + email;
    tripsLink.innerText = email;

    // add text and link to title div, below date
    var titleDiv = document.querySelector('div[class="col-title"]');
    titleDiv.innerHTML += 'Forward receipts to ';
    titleDiv.appendChild(tripsLink);

    // Auto-resize inline note editor
    document.arrive('.notesTextEditHolder', {fireOnAttributesModification: true}, function() {
        if (this.style.display == 'block') {
            autosize(this.querySelector('textarea[class="resizable notes"]'));
        }
    });

    // Auto-resize modal note editor
    // NOTE: using textarea selector instead causes page freeze upon replacing node or creating new node with same name
    document.arrive('#saveButtonWrapper', function() {
        // clone and replace textarea, otherwise keyup EventListener on default textarea will keep undoing our autosizing
        var notes = document.querySelector('textarea[name="notes"]');
        var cloned = notes.cloneNode(true);
        notes.parentNode.replaceChild(cloned, notes);

        autosize(cloned);

        // remove unneeded helper div
        var helperDiv = document.querySelector('.expansiveTextAreaHelperDiv');
        if (helperDiv)
            helperDiv.parentNode.removeChild(helperDiv);
    });
})();