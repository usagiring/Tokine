/**
 * Created by RedMoon on 2017/2/17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import 'scss/test.scss';
import $ from 'jquery';
import action from 'action';

function todoApp(state = initialState, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            })
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if(index === action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            })
        default:
            return state
    }
}

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);

let names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
    <div>
        {
            names.map(name => <div>Hello, {name}!</div>)
        }
    </div>,
    document.getElementById('example1')
);

var arr = [
    <h1>Hello world!</h1>,
    <h2>React is awesome</h2>,
];
ReactDOM.render(
    <div>{arr}</div>,
    document.getElementById('example2')
);

var HelloMessage = React.createClass({
    render: function () {
        return <h1>Hello {this.props.name}</h1>;
    }
});

ReactDOM.render(
    <HelloMessage name="John"/>,
    document.getElementById('example3')
);

var NotesList = React.createClass({
    render: function () {
        return (
            <ol>
                {
                    React.Children.map(this.props.children, function (child) {
                        return <li>{child}</li>;
                    })
                }
            </ol>
        );
    }
});

ReactDOM.render(
    <NotesList>
        <span>hello</span>
        <span>world</span>
    </NotesList>,
    document.getElementById('example4')
);

var data = "123";

var MyTitle = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
    },

    render: function () {
        return <h1> {this.props.title} </h1>;
    }
});

ReactDOM.render(
    <MyTitle title={data}/>,
    document.getElementById('example5')
);

var MyComponent = React.createClass({
    handleClick: function () {
        this.refs.myTextInput.focus();
    },
    render: function () {
        return (
            <div>
                <input type="text" ref="myTextInput"/>
                <input type="button" value="Focus the text input" onClick={this.handleClick}/>
            </div>
        );
    }
});

ReactDOM.render(
    <MyComponent />,
    document.getElementById('example6')
);

var LikeButton = React.createClass({
    getInitialState: function () {
        return {liked: false};
    },
    handleClick: function (event) {
        this.setState({liked: !this.state.liked});
    },
    render: function () {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <p onClick={this.handleClick}>
                You {text} this. Click to toggle.
            </p>
        );
    }
});

ReactDOM.render(
    <LikeButton />,
    document.getElementById('example7')
);

var Input = React.createClass({
    getInitialState: function () {
        return {value: 'Hello!'};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    render: function () {
        var value = this.state.value;
        return (
            <div>
                <input type="text" value={value} onChange={this.handleChange}/>
                <p>{value}</p>
            </div>
        );
    }
});

ReactDOM.render(<Input/>, document.getElementById('example8'));

var Hello = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1.0
        };
    },

    componentDidMount: function () {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity: opacity
            });
        }.bind(this), 100);
    },

    render: function () {
        return (
            <div style={{opacity: this.state.opacity}}>
                Hello {this.props.name}
            </div>
        );
    }
});

ReactDOM.render(
    <Hello name="world"/>,
    document.getElementById('example9')
);

var UserGist = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            lastGistUrl: ''
        };
    },

    componentDidMount: function () {
        $.get(this.props.source, function (result) {
            var lastGist = result[0];
            if (this.isMounted()) {
                this.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                });
            }
        }.bind(this));
    },

    render: function () {
        return (
            <div>
                {this.state.username}'s last gist is <a href={this.state.lastGistUrl}>here</a>.
            </div>
        );
    }
});

ReactDOM.render(
    <UserGist source="https://api.github.com/users/octocat/gists"/>,
    document.getElementById('example10')
);

var RepoList = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
            error: null,
            data: null
        };
    },

    componentDidMount() {
        this.props.promise.then(
            value => this.setState({loading: false, data: value}),
            error => this.setState({loading: false, error: error}));
    },

    render: function () {
        if (this.state.loading) {
            return <span>Loading...</span>;
        }
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }
        else {
            var repos = this.state.data.items;
            var repoList = repos.map(function (repo, index) {
                return (
                    <li key={index}><a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars)
                        <br/> {repo.description}</li>
                );
            });
            return (
                <main>
                    <h1>Most Popular JavaScript Projects in Github</h1>
                    <ol>{repoList}</ol>
                </main>
            );
        }
    }
});

ReactDOM.render(
    <RepoList promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}/>,
    document.getElementById('example11')
);
