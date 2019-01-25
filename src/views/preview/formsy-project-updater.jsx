const PropTypes = require('prop-types');
const React = require('react');
const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const api = require('../../lib/api');
const previewActions = require('../../redux/preview');

class FormsyProjectUpdater extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setRef',
            'handleUpdate'
        ]);
        this.state = {
            value: props.initialValue,
            error: false
        };
    }
    componentDidUpdate () {
        if (this.state.error !== false) {
            const errorMessageId = this.state.error === 400 ?
                'project.inappropriateUpdate' : 'general.notAvailableHeadline';
            this.ref.updateInputsWithError({
                [this.props.field]: this.props.intl.formatMessage({
                    id: errorMessageId
                })
            });
        }
    }
    handleUpdate (jsonData) {
        // Ignore updates that would not change the value
        if (jsonData[this.props.field] === this.state.value) return;

        api({
            uri: `/projects/${this.props.projectInfo.id}`,
            authentication: this.props.user.token,
            method: 'PUT',
            json: jsonData
        }, (err, body, res) => {
            if (res.statusCode === 200) {
                this.setState({value: body[this.props.field], error: false});
                this.props.onUpdate(jsonData);
            } else {
                this.setState({error: res.statusCode});
            }
        });
    }
    setRef (ref) {
        this.ref = ref;
    }
    render () {
        return this.props.children(
            this.state.value,
            this.setRef,
            this.handleUpdate
        );
    }
}

FormsyProjectUpdater.propTypes = {
    children: PropTypes.func.isRequired,
    field: PropTypes.string,
    initialValue: PropTypes.string,
    intl: intlShape,
    onUpdate: PropTypes.func,
    projectInfo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    user: PropTypes.shape({
        token: PropTypes.string
    })
};

const mapStateToProps = state => ({
    projectInfo: state.preview.projectInfo,
    user: state.session.session.user
});

const mapDispatchToProps = dispatch => ({
    onUpdate: info => {
        dispatch(previewActions.updateProjectInfo(info));
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(FormsyProjectUpdater)
);
