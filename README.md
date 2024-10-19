![Logo](admin/threema-gw.png)

# ioBroker.threema-gw

[![NPM version](https://img.shields.io/npm/v/iobroker.threema-gw.svg)](https://www.npmjs.com/package/iobroker.threema-gw)
[![Downloads](https://img.shields.io/npm/dm/iobroker.threema-gw.svg)](https://www.npmjs.com/package/iobroker.threema-gw)
![Number of Installations](https://iobroker.live/badges/threema-gw-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/threema-gw-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.threema-gw.png?downloads=true)](https://nodei.co/npm/iobroker.threema-gw/)

**Tests:** ![Test and Release](https://github.com/RPerkuhn/ioBroker.threema-gw/workflows/Test%20and%20Release/badge.svg)

## threema-gw adapter for ioBroker

ioBroker Threema Gateway Adapter

Send threema messages using the threema gateway.

As prerequisite you need a gateway account at threema. Unfortunately this is not free of charge.
For prices have a look at https://gateway.threema.ch.

In this version of the Threema gateway adapter it can only support BASIC sending out of messages. No attachements and no returns are possible. For details you can visit https://gateway.threema.ch

If you decide to order a threema gateway account, you can choose a threema sender name (beginning with \*) and after successful registration you'll get an API secret.

This API secret and the eight digit sender name has to be entered into the configuration page.
Also the eight digit receipient Threema-ID has to be entered there.
If you need more receipients you can activate further instances and configure them with different receipients.

Once configured you can send out alert- or info messages including emoticons and linebreaks ("\n")

## Usage

To send a threema-message from ScriptEngine just write:

```javascript
// simple message using instance 0 of threema-gw
sendTo("threema-gw.0", "send", "The battery in motion detector is low");

// message including emoticon, linebreak and special character using instance 0 of threema-gw
sendTo("threema-gw.0", "send", "😊\nThe temperature outside is above 25℃");
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (RPerkuhn) initial release

## License

MIT License

Copyright (c) 2024 RPerkuhn <ralf.perkuhn@online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

```
