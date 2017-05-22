module.exports = {
    'src_folders': ['test'],
    'output_folder': 'reports',
    'custom_commands_path': '',
    'custom_assertions_path': '',
    'page_objects_path': 'pages',
    'globals_path': '',
    'test_settings': {
        'default': {
            'silent': true,
            'selenium_host': 'selenium.integration_default',
            'launch_url': 'http://scratch-www.integration_default:8333',
            'screenshots': {
                'path': './screenshots',
                'enabled': true
            },
            'globals': {
                'waitForConditionTimeout': 5000
            },
            'desiredCapabilities': {
                'browserName': 'firefox'
            }
        },
        'firefox': {
            'desiredCapabilities': {
                'browserName': 'firefox',
                'javascriptEnabled': true
            }
        }
    }
};
