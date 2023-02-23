<script>
	import Question from './Question.svelte';

  const durationQuestion = {
		question: 'How much time do you have?',
		options: ['< 15 mins', '20 mins', '25 mins', '> 30 mins']
	};

  const energyQuestion = {
    question: 'How much energy do you have?',
		options: ['Lots', 'Some', 'Barely any']
  }

	const questions = [durationQuestion, energyQuestion];
</script>

<div class="questions-container">
  {#each questions as question}
	<Question questionText={question.question} options={question.options}/>
  {/each}
  <button class="cta">Find me yoga</button>
</div>

<style lang="scss">
  .questions-container {
    margin-top: 60px;
    text-align: center;
    width: 100%;

    .cta {
      margin-top: 2em;
    }
  }
</style>