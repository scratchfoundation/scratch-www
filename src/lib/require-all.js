var requireAll = function (requireContext) {
    return requireContext.keys().map(requireContext);
}

module.exports = requireAll;
