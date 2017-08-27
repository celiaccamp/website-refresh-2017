const DataCheckWrapper = ({ data, children }) => (
  data ? children : null
);
export default DataCheckWrapper;
