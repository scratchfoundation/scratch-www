const requireAll = requireContext => (
    requireContext.keys().map(requireContext)
);

module.exports = requireAll;
