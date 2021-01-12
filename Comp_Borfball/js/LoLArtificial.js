//Generate horse names
n_total = 12
n_baseline = 0
n_test = 12


First_names = ["Blue ","Red ","Green ","Yellow ","White ","Black ","Silver ","Golden ","Bronze ","Iron ","Gray ","Orange "]

Second_names = ["Tigers","Eagles","Lions","Bears","Falcons","Sharks","Dragons","Wolves","Hawks","Cobras","Spiders","Jaguars"]

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

game_name_options = shuffle(["morseth","kwep","blin","reesle","dorb","zorb","taifel","truft","daith","mook",
  "fram","luzak","jav","wug","cheeba","plov","grink","glippet","saper","stup","krivel","zoov","thup","crullet","fep"])

game_name = game_name_options[0]

cap_game_name = game_name.substring(0, 1).toUpperCase() + game_name.substring(1);

condition_options = shuffle([1,3,8])
condition = condition_options[0]

Shuffled_first_names = shuffle(First_names)
Shuffled_second_names = shuffle(Second_names)

Name_array = []

for(i=0;i<n_total;i++){
  Name_array.push(Shuffled_first_names[i].concat(Shuffled_second_names[i]))
}

//Create test trials race results

Test_exemplify_early = [1*condition,3*condition,5*condition]
Test_exemplify_late = [1*condition,3*condition,5*condition]

max_evidence = 6*condition

Test_trial_array = []

Evidence_options = ["laning phase","late game"]
Statement_options = ["would not","would"]

Statement_colors = ['background-color:#00FF00','background-color:#FF00FF']
Evidence_options = ['background-color:#FF00FF','background-color:#FFA500']

for(i=0;i<(n_test/4);i++){
  Name1 = i*4
  Name2 = i*4+1
  Name3 = i*4+2
  Name4 = i*4+3

  early_statement = coinFlip()
  if(early_statement==1){
  	early_statement2 = 0
  }else{
  	early_statement2 = 1
  }

  late_statement = coinFlip()
  if(late_statement==1){
  	late_statement2 = 0
  }else{
  	late_statement2 = 1
  }

  which_evidence = coinFlip()
  if(which_evidence==1){
  	which_evidence2 = 0
  	temp_evidence1 = Test_exemplify_late[i]
  	temp_evidence2 = Test_exemplify_early[i]

  }else{
  	which_evidence2 = 1
  	temp_evidence1 = Test_exemplify_early[i]
  	temp_evidence2 = Test_exemplify_late[i]
  }
  Test_trial_array.push({Team_name: Name_array[Name1], Evidence: temp_evidence1, Max_Evidence: max_evidence,
  	EarlySpeaker_index: early_statement,EarlySpeaker_word: Statement_options[early_statement], 
  	LateSpeaker_index: late_statement, LateSpeaker_word: Statement_options[late_statement],
  	Which_Evidence_index: which_evidence, Which_Evidence_word: Evidence_options[which_evidence]})
  Test_trial_array.push({Team_name: Name_array[Name2], Evidence: temp_evidence1, Max_Evidence: max_evidence,
  	EarlySpeaker_index: early_statement2,EarlySpeaker_word: Statement_options[early_statement2], 
  	LateSpeaker_index: late_statement2, LateSpeaker_word: Statement_options[late_statement2],
  	Which_Evidence_index: which_evidence, Which_Evidence_word: Evidence_options[which_evidence]})

 early_statement = coinFlip()
  if(early_statement==1){
  	early_statement2 = 0
  }else{
  	early_statement2 = 1
  }

  late_statement = coinFlip()
  if(late_statement==1){
  	late_statement2 = 0
  }else{
  	late_statement2 = 1
  }

  Test_trial_array.push({Team_name: Name_array[Name3], Evidence: temp_evidence1, Max_Evidence: max_evidence,
  	EarlySpeaker_index: early_statement,EarlySpeaker_word: Statement_options[early_statement], 
  	LateSpeaker_index: late_statement, LateSpeaker_word: Statement_options[late_statement],
  	Which_Evidence_index: which_evidence2, Which_Evidence_word: Evidence_options[which_evidence2]})
  Test_trial_array.push({Team_name: Name_array[Name4], Evidence: temp_evidence1, Max_Evidence: max_evidence,
  	EarlySpeaker_index: early_statement2,EarlySpeaker_word: Statement_options[early_statement2], 
  	LateSpeaker_index: late_statement2, LateSpeaker_word: Statement_options[late_statement2],
  	Which_Evidence_index: which_evidence2, Which_Evidence_word: Evidence_options[which_evidence2]})
}

Test_trial_array = shuffle(Test_trial_array)

question_order= shuffle([0,1,2,3])


which_response_first = shuffle([0,1])

win_responses = ["Knock over tower","Score more points"]

if(which_response_first==0){
	CorrectResponses = [0,1,0,0]
}else{CorrectResponses = [0,1,1,0]}

str1 = "When in a game of "
str3 = " do players generally compete individually?"
Q1 = str1.concat(game_name,str3)

str3_2 = " do players generally compete in groups?"
Q2 = str1.concat(game_name,str3_2)

str1_3 = "How does a team win a game of "
str3_3 = "?"
Q3 = str1_3.concat(game_name,str3_3)

compcheck_questions = shuffle([{Question: Q1, Options: ["Laning phase","Late game"], Correct: CorrectResponses[0]},
						{Question: Q2, Options: ["Laning phase","Late game"], Correct: CorrectResponses[1]},
						{Question: Q3, Options: [win_responses[which_response_first[0]], win_responses[which_response_first[1]]], Correct: CorrectResponses[2]},
						{Question: "Can teams potentially excel in both the laning phase and the late game?", Options: ["Yes","No"], Correct: CorrectResponses[3]}])

compcheck_array = []						

compcheck_array[0] = {Question0: compcheck_questions[0].Question, Options0:compcheck_questions[0].Options, Correct0: compcheck_questions[0].Correct,
						Question1: compcheck_questions[1].Question, Options1:compcheck_questions[1].Options, Correct1: compcheck_questions[1].Correct,
						Question2: compcheck_questions[2].Question, Options2:compcheck_questions[2].Options, Correct2: compcheck_questions[2].Correct,
						Question3: compcheck_questions[3].Question, Options3:compcheck_questions[3].Options, Correct3: compcheck_questions[3].Correct}

//Select spearker name


// Name_options = shuffle(["John","Jim","Joe","Bob","Bill","Will","Zac","Rick","Paul","Mike"])

// for(i=0;i<n_test;i++){
//   Test_trial_array[i].Speaker_name = Name_options[0]
// }

// Reliability_array = [{Speaker_name: Name_options[0]}]


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
    start: function() {
      $(".game_name").html(game_name)
    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
      $(".hidden").hide()
      exp._background_startTime = Date.now();
    }
  });

  slides.background = slide({
    name : "background",
    start: function() {
      $(".game_name").html(game_name)
      $(".cap_game_name").html(cap_game_name)
    },
    ShowButton : function() {
    	$(".hidden").show()
    	$(".ShowButton").hide()
    },
    button : function() {
      this.RT = (Date.now() - exp._background_startTime) / 1000; // record time spent on trial
      this.log_responses();

      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
    log_responses : function() {
      background_RT = this.RT
    }
  });

  slides.compcheck = slide({
    name: "compcheck",
    present: compcheck_array,
    present_handle: function(stim) {
      $(".err").hide();
      this.stim = stim; //I like to store this information in the slide so I can record it later.
      this.startTime = Date.now();
      $(".game_name").html(game_name)
      $(".Question0").html(stim.Question0)
      $(".Question1").html(stim.Question1)
      $(".Question2").html(stim.Question2)
      $(".Question3").html(stim.Question3)

      $(".Option0_0").html(stim.Options0[0])
      $(".Option0_1").html(stim.Options0[1])
      $(".Option1_0").html(stim.Options1[0])
      $(".Option1_1").html(stim.Options1[1])
      $(".Option2_0").html(stim.Options2[0])
      $(".Option2_1").html(stim.Options2[1])
      $(".Option3_0").html(stim.Options3[0])
      $(".Option3_1").html(stim.Options3[1])

      $(".Correct0").html(stim.Correct0)
      $(".Correct1").html(stim.Correct1)
      $(".Correct2").html(stim.Correct2)
      $(".Correct3").html(stim.Correct3)
      },

    button : function() {
      if ($('input[name=compcheck0]:checked').size() <= 0||$('input[name=compcheck1]:checked').size() <= 0||$('input[name=compcheck2]:checked').size() <= 0||$('input[name=compcheck3]:checked').size() <= 0) {
        $(".err").show();
      } else {
        this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    log_responses : function() {
      exp.compcheck = {
        "trial_type" : "compcheck",
        "trial_num": this.trial_num,
        "RT": this.RT,
        "compQuestion0": this.stim.Question0,
        "compOption0_0": this.stim.Option0_0,
        "compOption0_1": this.stim.Option0_1,
        "compCorrect0": this.stim.Correct0,
        "compResponse0": $('input[name=compcheck0]:checked').val(),

        "compQuestion1": this.stim.Question1,
        "compOption1_0": this.stim.Option1_0,
        "compOption1_1": this.stim.Option1_1,
        "compCorrect1": this.stim.Correct1,
        "compResponse1": $('input[name=compcheck1]:checked').val(),

        "compQuestion2": this.stim.Question2,
        "compOption2_0": this.stim.Option2_0,
        "compOption2_1": this.stim.Option2_1,
        "compCorrect2": this.stim.Correct2,
        "compResponse2": $('input[name=compcheck2]:checked').val(),

        "compQuestion3": this.stim.Question3,
        "compOption3_0": this.stim.Option3_0,
        "compOption3_1": this.stim.Option3_1,
        "compCorrect3": this.stim.Correct3,
        "compResponse3": $('input[name=compcheck3]:checked').val(),
      };
      this.trial_num++
    }
  });

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
      
      $(".Team_name").html(stim.Team_name)
      $(".Evidence").html(stim.Evidence)
      $(".Max_Evidence").html(stim.Max_Evidence)
      $(".EarlySpeaker_word").html(stim.EarlySpeaker_word)
      $(".EarlySpeaker_index").html(stim.EarlySpeaker_index)
      $(".LateSpeaker_word").html(stim.LateSpeaker_word)
      $(".LateSpeaker_index").html(stim.LateSpeaker_index)
      $(".Which_Evidence_word").html(stim.Which_Evidence_word)
      $(".Which_Evidence_index").html(stim.Which_Evidence_index)
      $(".Speaker_name").html(stim.Speaker_name)

      $(".err_radio").hide();
      $(".err_slider1").hide();
      $(".err_slider2").hide();
      $(".err_slider3").hide();
      $(".hidden1").hide();
      $(".hidden2").hide();
      $(".hidden3").hide();

      // if(stim.EarlySpeaker_index==0){
      //   <style>
      //     mark { 
      //   background-color: green;
      //   color: black;
      //   }
      // </style>
      // }

      $('input[type=radio]').attr('checked', false); //for radio button response

      this.sentence_types_testPred = ["Early","Late"];
      var sentences_testPred = {
        "Early": "...excel in the laning phase?",
        "Late": "...excel in the late game?"
      };

      this.sentence_types_testSpeaker1 = ["1"];
      var sentences_testSpeaker1 = {
        "1": "...excelled in the laning phase?",
      };

      this.sentence_types_testSpeaker2 = ["1"];
      var sentences_testSpeaker2 = {
        "1": "...excelled in the late game?",
      };

      this.n_sliders_testPred = this.sentence_types_testPred.length;
      $(".slider_row_testPred").remove();
      for (var i=0; i<this.n_sliders_testPred; i++) {
        var sentence_type_testPred = this.sentence_types_testPred[i];
        var sentence_testPred = sentences_testPred[sentence_type_testPred];

        $("#multi_slider_table_testPred").append('<tr class="slider_row_testPred"><td class="slider_target" id="object_testPred' + i + '">' + sentence_testPred + '</td><td colspan="2"><div id="slider_testPred' + i + '" class="slider">-------[ ]--------</div></td> <td colspan=1><p id="sliderValDisplay_testPred' + i + '"> _ </p> </td></tr>'); 
        utils.match_row_height("#multi_slider_table_testPred", ".slider_target");
      }

	  this.n_sliders_testSpeaker1 = this.sentence_types_testSpeaker1.length;
      $(".slider_row_testSpeaker1").remove();
      for (var i=0; i<this.n_sliders_testSpeaker1; i++) {
        var sentence_type_testSpeaker1 = this.sentence_types_testSpeaker1[i];
        var sentence_testSpeaker1 = sentences_testSpeaker1[sentence_type_testSpeaker1];

        $("#multi_slider_table_testSpeaker1").append('<tr class="slider_row_testSpeaker1"><td class="slider_target" id="object_testSpeaker1' + i + '">' + sentence_testSpeaker1 + '</td><td colspan="2"><div id="slider_testSpeaker1' + i + '" class="slider">-------[ ]--------</div></td> <td colspan=1><p id="sliderValDisplay_testSpeaker1' + i + '"> _ </p> </td></tr>'); 
        utils.match_row_height("#multi_slider_table_testSpeaker1", ".slider_target");
      }

      this.n_sliders_testSpeaker2 = this.sentence_types_testSpeaker2.length;
      $(".slider_row_testSpeaker2").remove();
      for (var i=0; i<this.n_sliders_testSpeaker2; i++) {
        var sentence_type_testSpeaker2 = this.sentence_types_testSpeaker2[i];
        var sentence_testSpeaker2 = sentences_testSpeaker2[sentence_type_testSpeaker2];

        $("#multi_slider_table_testSpeaker2").append('<tr class="slider_row_testSpeaker2"><td class="slider_target" id="object_testSpeaker2' + i + '">' + sentence_testSpeaker2 + '</td><td colspan="2"><div id="slider_testSpeaker2' + i + '" class="slider">-------[ ]--------</div></td> <td colspan=1><p id="sliderValDisplay_testSpeaker2' + i + '"> _ </p> </td></tr>'); 
        utils.match_row_height("#multi_slider_table_testSpeaker2", ".slider_target");
      }

      this.init_sliders_testPred(this.sentence_types_testPred);
      this.init_sliders_testSpeaker1(this.sentence_testSpeaker1);
      this.init_sliders_testSpeaker2(this.sentence_testSpeaker2);
      exp.sliderPost_testPred = [];
      exp.sliderPost_testSpeaker1 = [];
      exp.sliderPost_testSpeaker2 = [];
    },



    ShowButton1 : function() {
      if ($('input[name=TVJEarly]:checked').size() <= 0 || $('input[name=TVJLate]:checked').size() <= 0) {
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
      if (exp.sliderPost_testPred[0] == null||exp.sliderPost_testPred[1] == null) {
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

    ShowButton3 : function() {
      if (exp.sliderPost_testSpeaker1[0] == null) {
        $(".err_slider2").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        $(".hidden3").show();
        $(".ShowButton3").hide();
        $(".err_slider2").hide();
      }
    },

    button : function() {
      if (exp.sliderPost_testSpeaker2[0] == null) {
        $(".err_slider3").show();
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

    init_sliders_testSpeaker1 : function() {
      for (var i=0; i<this.sentence_types_testSpeaker1.length; i++) {
         utils.make_slider("#slider_testSpeaker1" + i, this.make_slider_callback_testSpeaker1(i));
      }
    },

    init_sliders_testSpeaker2 : function() {
      for (var i=0; i<this.sentence_types_testSpeaker2.length; i++) {
         utils.make_slider("#slider_testSpeaker2" + i, this.make_slider_callback_testSpeaker2(i));
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

    make_slider_callback_testSpeaker1 : function(i) {
      return function(event, ui) {
        exp.sliderPost_testSpeaker1[i] = ui.value;

        // Albert
        var sliderValDisplay_testSpeaker1 = document.getElementById("sliderValDisplay_testSpeaker1" + i);
        sliderValDisplay_testSpeaker1.innerHTML = Math.round(ui.value * 100);
        // End of Albert
      };
    },

    make_slider_callback_testSpeaker2 : function(i) {
      return function(event, ui) {
        exp.sliderPost_testSpeaker2[i] = ui.value;

        // Albert
        var sliderValDisplay_testSpeaker2 = document.getElementById("sliderValDisplay_testSpeaker2" + i);
        sliderValDisplay_testSpeaker2.innerHTML = Math.round(ui.value * 100);
        // End of Albert
      };
    },


    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "test",
        "trial_num": this.trial_num,
        "RT": this.RT,
        "Team_name": this.stim.Team_name,
        "Which_Evidence_index": this.stim.Which_Evidence_index,
        "Which_Evidence_word": this.stim.Which_Evidence_word,
        "Evidence": this.stim.Evidence,
        "Max_Evidence": this.stim.Max_Evidence,
        "EarlySpeaker_index": this.stim.EarlySpeaker_index,
        "EarlySpeaker_word": this.stim.EarlySpeaker_word,
        "LateSpeaker_index": this.stim.LateSpeaker_index,
        "LateSpeaker_word": this.stim.LateSpeaker_word,

        "TVJEarly" : $('input[name=TVJEarly]:checked').val(), //if using radio buttons
        "TVJLate" : $('input[name=TVJLate]:checked').val(), //if using radio buttons
        "Prior_Early" : exp.sliderPost_testPred[0],
        "Prior_Late" : exp.sliderPost_testPred[1],
        "Early_Speaker" : exp.sliderPost_testSpeaker1[0],
        "Late_Speaker" : exp.sliderPost_testSpeaker2[0],
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

  slides.resemblance = slide({
  name: "resemblance",

  present: [{"emptiness": "dear god please work"}],

present_handle : function(stim){
  $(".game_name").html(game_name)
$(".err_mega").hide();
},

    megaButton : function(){
    	resemble_target_response = $("#resemble_target").val()
        if($('input[name=resemble_strength]:checked').size() <= 0 || $('input[name=resemble_exp]:checked').size() <= 0||resemble_target_response.length==0){
        	$(".err_mega").show();  
        }
        else {this.RT = (Date.now() - this.startTime) / 1000; // record time spent on trial
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);           
      }
    },

  log_responses : function() {
    exp.resemblance = {
    "trial_type" : "resemblance",
    "game_name" : game_name,
    "resemble_target" : $("resemble_target").val(),
    "resemble_strength" : $('input[name="assess"]:checked').val(),
    "resemble_exp" : $('input[name="assess"]:checked').val(),
  }
  } 

})

  
  slides.subj_info =  slide({
    name : "subj_info",
    
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        useremail : $("#useremail").val(),
        language : $("#language").val(),
        // enjoyment : $("#enjoyment").val(),
        // asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        background_RT : background_RT
        // problems: $("#problems").val(),
        // fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "compcheck" : exp.compcheck,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "resemblance" : exp.resemblance,
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
    "compcheck",
    "test_trials",
    //"reliability",
    "resemblance",
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
