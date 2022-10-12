import React from 'react';
import Helmet from 'react-helmet';

// tag comments:
// * robots: important to set to "noindex", instructing crawlers to NOT include
// these secret pages in their indexes
// * description/og:description: other content values for these tags have
// already been provided elsewhere, so the page ends up with two of each; one
// very generic to Scratch, and then this more specific version.
// We anticipate that some renderers and browsers may use one, some the other.
// * link: consider all these signup pages to be one, in the hopes of further
// discouraging search engines from listing multiple secret links
const StudentRegistrationMeta = () => (
    <Helmet>
        <title>Class Registration</title>
        <meta
            name="robots"
            content="noindex"
        />
        <meta
            content="Scratch registration page for a particular class"
            name="description"
        />
        <meta
            content="Scratch registration page for a particular class"
            name="og:description"
        />
        <link
            rel="canonical"
            href="https://scratch.mit.edu/signup"
        />
    </Helmet>
);

StudentRegistrationMeta.propTypes = {};

export default StudentRegistrationMeta;
