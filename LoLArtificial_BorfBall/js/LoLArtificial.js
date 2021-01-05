//Generate horse names
n_total = 12
n_baseline = 0
n_test = 12

First_names = ["Old ","Little ","Patient ","Lucky ","Sergeant ","Junior ","Happy ","Solo ","Blue ","Dancing ","Swift ","Tidy ",
              "Mighty ","Red ","Daring ","Professor ","Precious ","Starlit ","Trojan ","Bubble ","Bold ","Mercurial ","Smooth ","Wandering "]

Second_names = ["Stripe","Banner","Lightning","Train","Snow","Dynamo","River","Shadow","Rose","Lion","Phoenix","Fire",
                "Cloud","Tree","Trickster","Spider","Hawk","Chef","Vanguard","Legacy","Dawn","Heart","Mist","Cricket"]

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function coinFlip() {
    return Math.floor(Math.random() * 2);
}

Shuffled_first_names = shuffle(First_names)
Shuffled_second_names = shuffle(Second_names)

Name_array = []

for(i=0;i<n_total;i++){
  j = i+12
  Name_array.push({Horse0: Shuffled_first_names[i].concat(Shuffled_second_names[i]), Horse1: Shuffled_first_names[j].concat(Shuffled_second_names[j])})
}

//Create baseline trials race results

Baseline_wins = shuffle([0,1,2,3,4,5])

Baseline_trial_array = []

for(i=0;i<n_baseline;i++){
  which_ref = coinFlip()
  if(which_ref==0){
    Baseline_trial_array.push({Names: Name_array[i], Horse0_wins: Baseline_wins[i], Horse1_wins: 5- Baseline_wins[i], Ref: which_ref, Ref_name: Name_array[i].Horse0}) 
  }
  else{
    Baseline_trial_array.push({Names: Name_array[i], Horse0_wins: 5- Baseline_wins[i], Horse1_wins: Baseline_wins[i], Ref: which_ref, Ref_name: Name_array[i].Horse1})
  }
}

//Create test trials race results

Bet_sequence_options = [[1,0,1,0,1,0],[0,1,0,1,0,1],[1,0,0,1,0,1],[1,0,1,0,0,1]]

Bet_sequence = Bet_sequence_options[0]

Test_wins_with = shuffle([5,4,3])
Test_wins_against = shuffle([0,1,2])

with_ticker = 0
against_ticker = 0

Test_trial_array = []

for(i=0;i<n_test;i++){
  which_ref = coinFlip()
  if(Bet_sequence[i]==0){
    if(which_ref==0){
      Test_trial_array.push({Names: Name_array[i+n_baseline], Horse0_wins: Test_wins_with[with_ticker], Horse1_wins: 5-Test_wins_with[with_ticker], Bet: 0, against_evidence: 0, Bet_name: Name_array[i+n_baseline].Horse0})
      with_ticker = with_ticker + 1
    }else {
      Test_trial_array.push({Names: Name_array[i+n_baseline], Horse0_wins: 5-Test_wins_with[with_ticker], Horse1_wins: Test_wins_with[with_ticker], Bet: 1, against_evidence: 0, Bet_name: Name_array[i+n_baseline].Horse1})
      with_ticker = with_ticker + 1
    }
  } else{
    if(which_ref==0){
      Test_trial_array.push({Names: Name_array[i+n_baseline], Horse0_wins: Test_wins_against[against_ticker], Horse1_wins: 5-Test_wins_against[against_ticker], Bet: 0, against_evidence: 1, Bet_name: Name_array[i+n_baseline].Horse0})
      against_ticker = against_ticker + 1
    } else{
      Test_trial_array.push({Names: Name_array[i+n_baseline], Horse0_wins: 5-Test_wins_against[against_ticker], Horse1_wins: Test_wins_against[against_ticker], Bet: 1, against_evidence: 1, Bet_name: Name_array[i+n_baseline].Horse1})
      against_ticker = against_ticker + 1
    }
  }
}

//Select spearker name


Name_options = shuffle(["John","Jim","Joe","Bob","Bill","Will","Zac","Rick","Paul","Mike"])

for(i=0;i<n_test;i++){
  Test_trial_array[i].Speaker_name = Name_options[0]
}

Reliability_array = [{Speaker_name: Name_options[0]}]


function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.background = slide({
    name : "background",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  // slides.baseline = slide({
  //   name: "baseline",
  //   present: Baseline_trial_array,
  //   present_handle: function(stim) {
  //     $(".err").hide();
  //     this.stim = stim; //I like to store this information in the slide so I can record it later.
  //     this.startTime = Date.now();

  //     $(".Horse0_name").html(stim.Names.Horse0)
  //     $(".Horse1_name").html(stim.Names.Horse1)
  //     $(".Horse0_wins").html(stim.Horse0_wins)
  //     $(".Horse1_wins").html(stim.Horse1_wins)
  //     $(".Ref_name").html(stim.Ref_name)

  //     this.sentence_types_Baseline = ["1"];
  //     var sentences_Baseline = {
  //       "1": " ",
  //     };

  //     this.n_sliders_Baseline = this.sentence_types_Baseline.length;
  //     $(".slider_row_Baseline").remove();
  //     for (var i=0; i<this.n_sliders_Baseline; i++) {
  //       var sentence_type_Baseline = this.sentence_types_Baseline[i];
  //       var sentence_Baseline = sentences_Baseline[sentence_type_Baseline];

  //     $("#multi_slider_table_Baseline").append('<tr class="slider_row_Baseline"><td class="slider_target" id="object_Baseline' + i + '">' + sentence_Baseline + '</td><td colspan="2"><div id="slider_Baseline' + i + '" class="slider">-------[ ]--------</div></td> <td colspan=1><p id="sliderValDisplay_Baseline' + i + '"> _ </p> </td></tr>'); 
  //     utils.match_row_height("#multi_slider_table_Baseline", ".slider_target");
  //     }

  //     this.init_sliders_Baseline(this.sentence_types_Baseline);
  //     exp.sliderPost_Baseline = [];

  //     $(".display_condition").html("You are in " + exp.condition + ".");
  //   },
  //   button : function() {
  //     if (exp.sliderPost_Baseline[0] == null) {
  //       $(".err").show();
  //     } else {
  //       this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
  //       this.log_responses();

  //       /* use _stream.apply(this); if and only if there is
  //       "present" data. (and only *after* responses are logged) */
  //       _stream.apply(this);
  //     }
  //   },

  //   init_sliders_Baseline : function() {
  //     for (var i=0; i<this.sentence_types_Baseline.length; i++) {
  //        utils.make_slider("#slider_Baseline" + i, this.make_slider_callback_Baseline(i));
  //     }
  //   },

  //   make_slider_callback_Baseline : function(i) {
  //     return function(event, ui) {
  //       exp.sliderPost_Baseline[i] = ui.value;

  //       // Albert
  //       var sliderValDisplay_Baseline = document.getElementById("sliderValDisplay_Baseline" + i);
  //       sliderValDisplay_Baseline.innerHTML = Math.round(ui.value * 100);
  //       // End of Albert
  //     };
  //   },

  //   log_responses : function() {
  //     exp.data_trials.push({
  //       "trial_type" : "baseline",
  //       "trial_num": this.trial_num,
  //       "RT": this.RT,
  //       "Horse0_name": this.stim.Names.Horse0,
  //       "Horse1_name": this.stim.Names.Horse1,
  //       "Horse0_wins": this.stim.Horse0_wins,
  //       "Horse1_wins": this.stim.Horse1_wins,
  //       "Referenced" : this.stim.Ref,
  //       "skill_estimate" : exp.sliderPost_Baseline[0]
  //     });
  //     this.trial_num++
  //   }
  // });

  slides.test_trials = slide({
    name : "test_trials",
    trial_num: 1, // counter to record trial number within block

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : Test_trial_array,

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //I like to store this information in the slide so I can record it later.
      this.startTime = Date.now();

      $(".Horse0_name").html(stim.Names.Horse0)
      $(".Horse1_name").html(stim.Names.Horse1)
      $(".Horse0_wins").html(stim.Horse0_wins)
      $(".Horse1_wins").html(stim.Horse1_wins)
      $(".Bet_name").html(stim.Bet_name)
      $(".Speaker_name").html(stim.Speaker_name)

      $(".err_radio").hide();
      $(".err_slider1").hide();
      $(".err_slider2").hide();
      $(".hidden1").hide();
      $(".hidden2").hide();

      $('input[type=radio]').attr('checked', false); //for radio button response

      this.sentence_types_testPred = ["1"];
      var sentences_testPred = {
        "1": " ",
      };

      this.sentence_types_testSpeaker = ["1"];
      var sentences_testSpeaker = {
        "1": " ",
      };

      this.n_sliders_testPred = this.sentence_types_testPred.length;
      $(".slider_row_testPred").remove();
      for (var i=0; i<this.n_sliders_testPred; i++) {
        var sentence_type_testPred = this.sentence_types_testPred[i];
        var sentence_testPred = sentences_testPred[sentence_type_testPred];

        $("#multi_slider_table_testPred").append('<tr class="slider_row_testPred"><td class="slider_target" id="object_testPred' + i + '">' + sentence_testPred + '</td><td colspan="2"><div id="slider_testPred' + i + '" class="slider">-------[ ]--------</div></td> <td colspan=1><p id="sliderValDisplay_testPred' + i + '"> _ </p> </td></tr>'); 
        utils.match_row_height("#multi_slider_table_testPred", ".slider_target");
      }

	  this.n_sliders_testSpeaker = this.sentence_types_testSpeaker.length;
      $(".slider_row_testSpeaker").remove();
      for (var i=0; i<this.n_sliders_testSpeaker; i++) {
        var sentence_type_testSpeaker = this.sentence_types_testSpeaker[i];
        var sentence_testSpeaker = sentences_testSpeaker[sentence_type_testSpeaker];

        $("#multi_slider_table_testSpeaker").append('<tr class="slider_row_testSpeaker"><td class="slider_target" id="object_testSpeaker' + i + '">' + sentence_testSpeaker + '</td><td colspan="2"><div id="slider_testSpeaker' + i + '" class="slider">-------[ ]--------</div></td> <td colspan=1><p id="sliderValDisplay_testSpeaker' + i + '"> _ </p> </td></tr>'); 
        utils.match_row_height("#multi_slider_table_testSpeaker", ".slider_target");
      }

      this.init_sliders_testPred(this.sentence_types_testPred);
      this.init_sliders_testSpeaker(this.sentence_testSpeaker);
      exp.sliderPost_testPred = [];
      exp.sliderPost_testSpeaker = [];
    },



    ShowButton1 : function() {
      if ($('input[name=TVJHorse0]:checked').size() <= 0 || $('input[name=TVJHorse1]:checked').size() <= 0) {
        $(".err_radio").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        $(".hidden1").show();
        $(".ShowButton1").hide();
        $(".err_radio").hide();
      }
    },

    ShowButton2 : function() {
      if (exp.sliderPost_testPred[0] == null) {
        $(".err_slider1").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        $(".hidden2").show();
        $(".ShowButton2").hide();
        $(".err_slider1").hide();
      }
    },

    button : function() {
      if (exp.sliderPost_testSpeaker[0] == null) {
        $(".err_slider2").show();
      } else {
        this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
        this.log_responses();
        $(".ShowButton1").show();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },


    init_sliders_testPred : function() {
      for (var i=0; i<this.sentence_types_testPred.length; i++) {
         utils.make_slider("#slider_testPred" + i, this.make_slider_callback_testPred(i));
      }
    },

    init_sliders_testSpeaker : function() {
      for (var i=0; i<this.sentence_types_testSpeaker.length; i++) {
         utils.make_slider("#slider_testSpeaker" + i, this.make_slider_callback_testSpeaker(i));
      }
    },

    make_slider_callback_testPred : function(i) {
      return function(event, ui) {
        exp.sliderPost_testPred[i] = ui.value;

        // Albert
        var sliderValDisplay_testPred = document.getElementById("sliderValDisplay_testPred" + i);
        sliderValDisplay_testPred.innerHTML = Math.round(ui.value * 100);
        // End of Albert
      };
    },

    make_slider_callback_testSpeaker : function(i) {
      return function(event, ui) {
        exp.sliderPost_testSpeaker[i] = ui.value;

        // Albert
        var sliderValDisplay_testSpeaker = document.getElementById("sliderValDisplay_testSpeaker" + i);
        sliderValDisplay_testSpeaker.innerHTML = Math.round(ui.value * 50);
        // End of Albert
      };
    },


    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "one_slider",
        "trial_num": this.trial_num,
        "RT": this.RT,
        "Horse0_name": this.stim.Names.Horse0,
        "Horse1_name": this.stim.Names.Horse1,
        "Horse0_wins": this.stim.Horse0_wins,
        "Horse1_wins": this.stim.Horse1_wins,
        "Bet_name": this.stim.Bet_name,
        "Bet_index": this.stim.Bet,
        "against_evidence": this.stim.against_evidence,

        "TVJHorse0" : $('input[name=TVJHorse0]:checked').val(), //if using radio buttons
        "TVJHorse1" : $('input[name=TVJHorse1]:checked').val(), //if using radio buttons
        "test_Speaker" : exp.sliderPost_testSpeaker[0],
        "test_Pred" : exp.sliderPost_testPred[0]
      });
      this.trial_num++
    }
  });

  // slides.reliability = slide({
  //   name : "reliability",

  //   /* trial information for this block
  //    (the variable 'stim' will change between each of these values,
  //     and for each of these, present_handle will be run.) */
  //   present : Reliability_array,

  //   //this gets run only at the beginning of the block
  //   present_handle : function(stim) {
  //     $(".err").hide();
  //     this.stim = stim; //I like to store this information in the slide so I can record it later.
  //     this.startTime = Date.now();

  //     $(".Speaker_name").html(stim.Speaker_name)

  //   },

  //   button : function() {
  //     if ($('input[name="reliability"]:checked').size() <= 0) {
  //       $(".err").show();
  //     } else {
  //       this.log_responses();
  //       _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
  //     }
  //   },

  //   log_responses : function() {
  //       exp.data_trials.push({
  //         "trial_type" : "reliability",
  //         "Speaker_name" : this.stim.Speaker_name,
  //         "reliability_response" : $('input[name="reliability"]:checked').val()
  //       });
  //     },
  // });

  
  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  // simple language comprehension check to include at beginning of experiment
  // slides.botcaptcha = slide({
  //    name : "botcaptcha",
  //    bot_trials : 0,
  //    start: function() {
  //      $("#error").hide();
  //      $("#error_incorrect").hide();
  //      $("#error_2more").hide();
  //      $("#error_1more").hide();
  //      // list of speaker names to be sampled from
  //      speaker = _.sample(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"]);
  //      // list of listener names to be sampled from
  //      listener = _.sample(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"]);
  //      // create the utterance
  //      this.bot_utterance = speaker + " says to " + listener + ": It's a beautiful day, isn't it?"
  //      // creat ethe question
  //      this.bot_question = "Who is " + speaker + " talking to?"
  //      // append the utterance and the question to the view
  //      var bot_sentence = document.createElement("p");
  //      var bot_question = document.createElement("p");
  //      var content = document.createTextNode(this.bot_utterance);
  //      var q_content = document.createTextNode(this.bot_question);
  //      bot_sentence.name = "bot_sentence";
  //      bot_question.name = "bot_question";
  //      bot_sentence.appendChild(content);
  //      bot_question.appendChild(q_content);
  //      document.getElementById('bot_context').appendChild(bot_sentence);
  //      document.getElementById('bot_context').appendChild(document.createElement("br"));
  //      document.getElementById('bot_context').appendChild(bot_question);
  //      document.getElementById('bot_context').appendChild(document.createElement("br"));

  //    },
  //    button: function() {
  //      // get the participants' input
  //      bot_response = $("#botresponse").val();
  //      // append data if response correct
  //      if (bot_response.toLowerCase() == listener.toLowerCase()) {
  //        exp.catch_trials.push({
  //          condition: "botcaptcha",
  //          n_fails: this.bot_trials,
  //          response: bot_response,
  //          bot_sentence: this.bot_utterance,
  //          bot_question: this.bot_question
  //        });
  //        exp.go();
  //        // gives participant two more trials if the response was incorrect
  //      } else {
  //        this.bot_trials++;
  //        $("#error_incorrect").show();
  //        if (this.bot_trials == 1) {
  //            $("#error_2more").show();
  //        } else if (this.bot_trials == 2) {
  //            $("#error_2more").hide();
  //            $("#error_1more").show();
  //        } else {
  //          // if participant fails, they cannot proceed
  //            $("#error_incorrect").hide();
  //            $("#error_1more").hide();
  //            $("#bot_button").hide();
  //            $('#botresponse').prop("disabled", true);
  //            $("#error").show();
  //        };
  //      }
  //    }
  // });


  return slides;
}

/// init ///
function init() {

  //; support for uniqueturker
  // https://uniqueturker.myleott.com
  repeatWorker = false;
  (function(){
      var ut_id = "[INSERT uniqueTurkerID]";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = _.sample(["CONDITION 1", "condition 2"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  //blocks of the experiment:
  exp.structure=[
    "i0",
    //"botcaptcha",
    "instructions",
    "background",
    //"baseline",
    "test_trials",
    //"reliability",
    "subj_info",
    "thanks"
  ];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });


  // Extra check for US IP addresses
  // TO DO: add support for Canadian IP addresses
  function USOnly() {
    var accessKey = 'b487843addca6e9ec32e6ae28aeaa022';
     $.ajax({
       url: 'https://geo.ipify.org/api/v1?apiKey=at_nuIzsEIQJAft6sr1WH67UTfFDeMIO',
       dataType: 'jsonp',
       success: function(json) {
       if (json.location.country != 'US') {
         var slides = document.getElementsByClassName('slide');
         for (i=0; i<slides.length; i++) {
          slides[i].style.display = 'none';
         }
          document.getElementsByClassName('progress')[0].style.display = 'none';
          document.getElementById('unique').innerText = "This HIT is only available to workers in the United States. Please click 'Return' to avoid any impact on your approval rating.";
        }
      }
     });
  }

  exp.go(); //show first slide
  USOnly(); // check US IP address
}
