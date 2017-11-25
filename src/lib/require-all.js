var requireAll = function (requireContext) {
    return requireContext.keys().map(requireContext);
};

export default requireAll;
