// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

suite('toolbar tests', function() {
  /** @type {!downloads.Toolbar} */
  var toolbar;

  setup(function() {
    /**
     * @constructor
     * @extends {downloads.ActionService}
     */
    function TestActionService() {
      downloads.ActionService.call(this);
    }

    TestActionService.prototype = {
      __proto__: downloads.ActionService.prototype,
      loadMore: function() { /* Prevent chrome.send(). */ },
    };

    toolbar = document.createElement('downloads-toolbar');
    downloads.ActionService.instance_ = new TestActionService;
    document.body.appendChild(toolbar);
  });

  test('resize closes more options menu', function() {
    MockInteractions.tap(toolbar.$$('paper-icon-button'));
    assertTrue(toolbar.$.more.opened);

    window.dispatchEvent(new CustomEvent('resize'));
    assertFalse(toolbar.$.more.opened);
  });

  test('search starts spinner', function() {
    toolbar.$.toolbar.fire('search-changed', 'a');
    assertTrue(toolbar.spinnerActive);

    // Pretend the manager got results and set this to false.
    toolbar.spinnerActive = false;

    toolbar.$.toolbar.fire('search-changed', 'a ');  // Same term plus a space.
    assertFalse(toolbar.spinnerActive);
  });
});