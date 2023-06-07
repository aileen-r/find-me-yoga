<script>
  const colorClassesMap = {
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-amber-100 border-amber-400 text-amber-700'
  }

  export let type = 'success'; // Default to info once it's used.

  $: colorClasses = colorClassesMap[type] ?? colorClassesMap.success;
</script>

<div class="{`border px-4 py-3 rounded relative ${colorClasses}`}" role="alert"><slot /></div>