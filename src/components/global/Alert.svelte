<script>
  const colorClassesMap = {
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-amber-100 border-amber-400 text-amber-700',
    error: 'bg-red-100 border-red-400 text-red-700'
  }

  export let type = 'success'; // Default to info once it's used.

  $: colorClasses = colorClassesMap[type] ?? colorClassesMap.success;
</script>

<div class="{`border px-4 py-3 rounded ${colorClasses}`}" role="alert"><slot /></div>