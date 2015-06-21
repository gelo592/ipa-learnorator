ipaPracticizer = {
  // morphemes with two or more characters have # as separator
  mapToIPA: {
    'e4' : '251',
    '100' : 'e6',
    '100#72' : '3b5#279',
    '101' : '65#26a',
    'e4#72' : '251#279',
    'e2#72' : '3b5#279',
    '115' : '3b5',
    '115#72' : '3b5#279',
    '113' : '69',
    '69' : '69',
    '12d' : '26a',
    'ee#72' : '26a#279',
    '12d#72' : '26a#279',
    '12b' : '61#26a',
    '14f' : '251',
    '14d' : '6f#28A',
    '14d#72' : '6f#279',
    'f4' : '254',
    'f4#72' : '254#279',
    '6f#69' : '254#26a',
    '6f#35d#6f' : '28A',
    '6f#35d#6f#72' : '28A#279',
    '6f#35e#6f' : '75',
    '6f#75' : 'a28A',
    '16d' : '28C',
    'fb#72' : '259#279',
    '259' : '259',
    '259#72' : '25a',
    '62' : '62',
    '63#68' : '74#283',
    '64' : '64',
    '66' : '66',
    '67': '67',
    '68' : '68',
    '68#77' : '28D',
    '6a' : '64#292',
    '6b' : '6b',
    '4b#48' : '78',
    '6c' : '6c',
    '6d' : '6d',
    '6e' : '6e',
    '6e#67' : '14B',
    '70' : '70',
    '72' : '279',
    '73' : '73',
    '73#68' : '283',
    '74' : '74',
    '74#68' : '3B8',
    'fe' : 'F0',
    '76' : '76',
    '77' : '77',
    '79' : '6a',
    '7a' : '7a',
    '7a#68' : '292'
  },

  api_key_shh_dont_show_this_to_anyone: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',

  api_base_url: 'http://api.wordnik.com/v4/word.json/',


  getPronunciation: function(word) {
    var url = this.api_base_url + word + '/pronunciations?api_key=' + this.api_key_shh_dont_show_this_to_anyone;

    //var req = http.get(url, this.processPronunciation);

    $.ajax({
      url: this.api_base_url + word + '/pronunciations/?api_key=' + this.api_key_shh_dont_show_this_to_anyone,
      success: this.processPronunciation
    });
    //req.end();
  },

  processPronunciation: function(resData) {
    if(resData && resData.length > 0 && resData[0].rawType === "ahd-legacy") {
      var ahd = resData[0].raw;
      console.log(ahd);
      ahd = ahd.slice(1, ahd.length-1);
      console.log(ahd);
      ahd = ahd.split('');
      console.log(ahd);
      ipaPracticizer.convertToIPA(ahd);
    }
  },

  convertToIPA: function(ahd) {
    console.log('im converting look at meeeee');
  },

  getAudio: function(word) {
    var url = this.api_base_url + word + '/audio?api_key=' + this.api_key_shh_dont_show_this_to_anyone;
    $.ajax({
      url: this.api_base_url + word + '/audio/?api_key=' + this.api_key_shh_dont_show_this_to_anyone,
      success: this.processAudio
    });
  },

  processAudio: function(resData) {
    var audio = resData[0].fileUrl;

    // code stolen from ddg dictionary answer they say mac is the best
    for (var i=0,r; r=resData[i]; i++) {
      if (r.createdBy === "macmillan") {
          audio = r.fileUrl;
      }
    }

    $(".sound-main").attr("src", audio);
  },

  appendLetter: function(letter) {
      var currentWord = $(".ipa-box").val() + letter;
      $(".ipa-box").val(currentWord);
      console.log(currentWord);
      var textLength = currentWord.length;
      $(".ipa-box").focus();
      $(".ipa-box")[0].setSelectionRange(textLength, textLength);
  },

  interceptTyping: function(e) {
    console.log(e.which);
    if(e.which <= 46) { return; }
    if((e.which >= 106 && e.which <= 111) || (e.which >= 186 && e.which <= 222) || e.which == 229) {
      e.preventDefault();
      return;
    }
    switch(e.which) {
      case 48:
      case 96: // 0
        e.preventDefault();
        ipaPracticizer.appendLetter('ɑ');
        break;
      case 49:
      case 97: // 1
        e.preventDefault();
        ipaPracticizer.appendLetter('i')
        break;
      case 50:
      case 98: // 2
        e.preventDefault();
        ipaPracticizer.appendLetter('ɪ')
        break;
      case 51:
      case 99: // 3
        e.preventDefault();
        ipaPracticizer.appendLetter('u')
        break;
      case 52:
      case 100: // 4
        e.preventDefault();
        ipaPracticizer.appendLetter('ʊ')
        break;
      case 53:
      case 101: // 5
        e.preventDefault();
        ipaPracticizer.appendLetter('ɛ')
        break;
      case 54:
      case 102: // 6
        e.preventDefault();
        ipaPracticizer.appendLetter('ɚ')
        break;
      case 55:
      case 103: // 7
        e.preventDefault();
        ipaPracticizer.appendLetter('ɔ')
        break;
      case 56:
      case 104: // 8
        e.preventDefault();
        ipaPracticizer.appendLetter('æ')
        break;
      case 57:
      case 105: // 9
        e.preventDefault();
        ipaPracticizer.appendLetter('ʌ')
        break;
      case 65: // a
      case 67: // c
      case 69: // e
      case 73: // i
      case 79: // o
      case 81: // q
      case 85: // u
      case 88: // x
      case 89: // y
        console.log(e.ctrlKey && e.metaKey && e.shiftKey && e.altKey);
        if(!(e.ctrlKey || e.metaKey)) {
          e.preventDefault();
        }
        break;
      case 68: // d
        if(e.ctrlKey) {
          e.preventDefault();
          ipaPracticizer.appendLetter('ð');
        }
        break;
      case 71: // g
        if(e.ctrlKey) {
          e.preventDefault();
          ipaPracticizer.appendLetter('dʒ');
        }
        break;
      case 72: // h
        if(e.ctrlKey) {
          e.preventDefault();
          ipaPracticizer.appendLetter('tʃ');
        }
        break;
      case 74: // j
        if(e.ctrlKey) {
          e.preventDefault();
          ipaPracticizer.appendLetter('ʒ');
        }
        break;
      case 78: // n
        if(e.ctrlKey) {
          e.preventDefault();
          ipaPracticizer.appendLetter('ŋ');
        }
        break;
      case 83: // s
        if(e.ctrlKey) {
          e.preventDefault();
          ipaPracticizer.appendLetter('ʃ');
        }
        break;
      case 84: // t
        if(e.ctrlKey) {
          e.preventDefault();
          ipaPracticizer.appendLetter('θ');
        }
        break;
    }
  }
};

ipaPracticizer.getPronunciation('blue');

ipaPracticizer.getAudio('blue');

$(function() {
  $(".sound-button-main").click(function() {
    $(".sound-main")[0].play();
  });

  $(".sound-button").click(function() {
    console.log($(this).find("audio"));
    $(this).find("audio")[0].play();
  });

  $(".ipa-box").keydown(ipaPracticizer.interceptTyping);
});