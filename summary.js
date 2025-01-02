
const form = document.getElementById('surveyForm');
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the form values
  const age = document.querySelector('input[name="age"]').value;
  const sex = document.querySelector('input[name="sex"]:checked').value;
  const handedness = document.querySelector('input[name="handedness"]:checked').value;
  const shortFormVideoHours = document.querySelector('select[name="shortFormVideoHours"]').value;
  const smartphoneHours = document.querySelector('select[name="smartphoneHours"]').value;
  const studyFamiliarity = document.querySelector('select[name="studyFamiliarity"]').value;
  const digitalDeviceHours = document.querySelector('select[name="digitalDeviceHours"]').value;
  const comments = document.querySelector('textarea[name="comments"]').value;
  const prolificPID = localStorage.getItem('prolificPID');
  const studyID = localStorage.getItem('studyID');
  const sessionID = localStorage.getItem('sessionID');
  const group = localStorage.getItem('group');
  const condition = localStorage.getItem('condition');
  const wordsAll = (JSON.parse(localStorage.getItem('wordsAll')) || []).join(',');
  const words1 = (JSON.parse(localStorage.getItem('words1')) || []).join(',');
  const words2 = (JSON.parse(localStorage.getItem('words2')) || []).join(',');
  const words3 = (JSON.parse(localStorage.getItem('words3')) || []).join(',');
  const correct1 = localStorage.getItem('correct1');
  const correct2 = localStorage.getItem('correct2');
  const incorrect1 = localStorage.getItem('incorrect1');
  const incorrect2 = localStorage.getItem('incorrect2');


  // Create the data object to be sent to the server
  const data = {
    age: age,
    sex: sex,
    handedness: handedness,
    shortFormVideoHours: shortFormVideoHours,
    smartphoneHours: smartphoneHours,
    studyFamiliarity: studyFamiliarity,
    digitalDeviceHours: digitalDeviceHours,
    comments: comments,
    prolificPID: prolificPID,
    studyID: studyID,
    sessionID: sessionID,
    group: group,
    condition: condition,
    wordsAll: wordsAll,
    words1: words1,
    words2: words2,
    words3: words3,
    correct1: correct1,
    correct2: correct2,
    incorrect1: incorrect1,
    incorrect2: incorrect2

  };

  // Send the data to the server using fetch
  fetch('https://ideagenerationstudy-24cbf2e10a46.herokuapp.com/submit-summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        console.log('Survey data submitted successfully!');
      } else {
        console.log('Error submitting survey data:', response.status);
      }
      alert('You have completed the study. You will now be directed back to Prolific.')
      localStorage.clear();
      window.location.href = "https://app.prolific.com/submissions/complete?cc=C1MHFT1N";

    })
    .catch(error => {
      console.error('Error submitting survey data:', error);
    });
});


