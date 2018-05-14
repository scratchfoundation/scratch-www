const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');
const Page = require('../../components/page/www/page.jsx');

const Research = props => (
    <InformationPage title={props.intl.formatMessage({id: 'research.title'})}>
        <div className="inner info-inner">
            <p><FormattedMessage id="research.conductors" /></p>
            <p>
                <FormattedMessage
                    id="research.privacy"
                    values={{
                        contactLink: (
                            <a href="/contact-us/">
                                <FormattedMessage id="research.contactLinkText" />
                            </a>
                        )
                    }}
                />
            </p>
            <p><FormattedMessage id="research.intro" /></p>
            <h3><FormattedMessage id="research.papers" /></h3>
            <ul>
                <li>
                    Choi, B., Jung, J. &amp; Baek, Y. (2013).{' '}
                    <a href="http://www.editlib.org/p/48061">
                        In what way can technology enhance student learning? :{' '}
                        A preliminary study of technology supported learning in mathematics.
                    </a> In R. McBride &amp; M. Searson (Eds.), Proceedings of Society{' '}
                    for Information Technology &amp;{' '}
                    Teacher Education International Conference 2013 (pp. 3-9). Chesapeake, VA: AACE.
                </li>
                <li>
                    Dasgupta, S. (2013).{' '}
                    <a href="http://dl.acm.org/citation.cfm?doid=2485760.2485784">
                        From surveys to collaborative art: enabling children to program with online data.
                    </a> Proceedings of the 12th International Conference on Interaction Design{' '}
                    and Children (IDC &apos;13).
                </li>
                <li>
                    Fields, D. A., Giang, M. &amp; Kafai, Y. B. (2013).{' '}
                    <a
                        href="//cdn.scratch.mit.edu/scratchr2/static/__868b8818d76143ec272057b47660c443__/
                        pdfs/research/Fields_etal_CSCL_2013.pdf"
                    >
                        Understanding collaborative practices in the Scratch online community:{' '}
                        Patterns of participation among youth designers.
                    </a> In N. Rummel, M. Kapur, M. Nathan, &amp; S. Puntambekar (Eds),{' '}
                    CSCL 2013 Conference Proceedings, Volume 1.{' '}
                    International Society of the Learning Sciences: Madison, WI, 200-207.
                </li>
                <li>
                    Koh, K. (2013).{' '}
                    <a href="http://onlinelibrary.wiley.com/doi/10.1002/asi.22878/abstract">
                        Adolescents’ information-creating behavior embedded in digital media practice using Scratch.
                    </a> Journal of the American Society for Information Science and Technology. 64(9),{' '}
                    1826-1841.
                </li>
                <li>
                    Hill, B M., &amp; Monroy-Hernández, A. (2013).{' '}
                    <a href="http://abs.sagepub.com/content/57/5/643">
                        The remixing dilemma: the trade-off between generativity and originality
                    </a>. <i>American Behavioral Scientist</i>, 57-5, Pp. 643—663. [
                    <a href="http://abs.sagepub.com/content/57/5/643">
                        Official Link
                    </a>] [
                    <a href="http://mako.cc/academic/hill_monroy-remixing_dilemma-DRAFT.pdf">
                        Preprint/Draft PDF
                    </a>] (Press:
                    <a href="http://www.wired.co.uk/news/archive/2013-05/13/remixable-project">
                        Wired UK
                    </a>,{' '}
                    <a href="http://boingboing.net/2013/05/10/what-makes-a-project-remixable.html">
                        Boing Boing
                    </a>)
                </li>
                <li>
                    Hill, B.M. &amp; Monroy-Hernández, A. (2013).{' '}
                    <a href="https://dl.acm.org/citation.cfm?id=2441776.2441893">
                        The cost of collaboration for code and art: Evidence from a remixing community.
                    </a> Forthcoming in &lt;i&gt;Proceedings of the ACM Conference{' '}
                    on Computer Supported Cooperative Work (CSCW &apos;13)&lt;/i&gt;.{' '}
                    San Antonio, Texas, USA: ACM. Best Paper Award [
                    <a href="https://dl.acm.org/citation.cfm?id=2441776.2441893">
                        Official Link
                    </a>] [
                    <a href="http://mako.cc/academic/hill_monroy-cost_of_collaboration-CSCW2013.pdf">
                        Preprint PDF
                    </a>]
                </li>
                <li>
                    Roque, R., Rusk, N., &amp; Blanton, A. (2013).{' '}
                    <a
                        href="//cdn.scratch.mit.edu/scratchr2/static/__868b8818d76143ec272057b47660c443__/
                        pdfs/research/Roque_etal_2013_Youth_Online_Roles_CSCL.pdf"
                    >
                        Youth roles and leadership in an online creative community.
                    </a> In Computer Supported Collaborative Learning Conference Proceedings,{' '}
                    Volume 1, International Society of the Learning Sciences.
                </li>
                <li>
                    Brennan, K. (2012).{' '}
                    <a
                        className="external"
                        href="http://web.media.mit.edu/~kbrennan/files/dissertation/Brennan_Dissertation.pdf"
                    >
                        Best of Both Worlds: Issues of Structure and Agency in Computational Creation,{' '}
                        In and Out of School
                    </a>. PhD Dissertation. MIT Media Lab.
                </li>
                <li>
                    Brennan, K., and Resnick, M. (2012).{' '}
                    <a href="http://web.media.mit.edu/~kbrennan/files/Brennan_Resnick_AERA2012_CT.pdf">
                        New frameworks for studying and assessing the development of computational thinking
                    </a>. Proceedings of the American Educational Research Association (AERA) annual conference.
                </li>
                <li>
                    Burke, Q., and Kafai, Y.B. (2012).{' '}
                    <a href="http://www.researchgate.net/publication/230874961_The_Writers'_Workshop_for_Youth_Programmers_Digital_Storytelling_with_Scratch_in_Middle_School_Classrooms/file/d912f5059e7c6a43ed.pdf">
                        The writers’ workshop for youth programmers: Digital storytelling with Scratch{' '}
                        in middle school classrooms
                    </a>. Proceedings of the 43rd ACM technical symposium on Computer Science Education, ACM 2012.
                </li>
                <li>
                    Carini, G. (2012).{' '}
                    <a href="http://llk.media.mit.edu/papers/gaia-thesis.pdf">
                        Finding a Needle in a Haystack: New Ways to Search and Browse on Scratch
                    </a>. Masters Thesis, MIT Media Lab.
                </li>
                <li>
                    Dasgupta, S. (2012).{' '}
                    <a href="http://llk.media.mit.edu/papers/sayamindu-thesis.pdf">
                        Learning with Data: A toolkit to democratize the computational exploration of data
                    </a>. Masters Thesis, MIT Media Lab.
                </li>
                <li>
                    Ericson, B., and McKlin, T. (2012).{' '}
                    <a href="http://dl.acm.org/citation.cfm?id=2157136.2157223">
                        Effective and sustainable computing summer camps.
                    </a> In SIGCSE &apos;12 Proceedings of the 43rd ACM technical symposium{' '}
                    on Computer Science Education (pp. 289-294).
                </li>
                <li>
                    Hwang, T. (2012).{' '}
                    <a href="http://llk.media.mit.edu/papers/tony-hwang-thesis.pdf">
                        Exploring Real-Time Video Interactivity with Scratch
                    </a>. Masters Thesis. MIT Media Lab.
                </li>
                <li>
                    Monroy-Hernández, A. (2012).{' '}
                    <a href="http://llk.media.mit.edu/papers/andres-dissertation.pdf">
                        Designing for Remixing: Supporting an Online Community of Amateur Creators
                    </a>. PhD Dissertation. MIT Media Lab.
                </li>
                <li>
                    Peppler, K., &amp; Warschauer, M. (2012).{' '}
                    <a href="http://www.mitpressjournals.org/doi/pdf/10.1162/IJLM_a_00073">
                        Uncovering literacies, disrupting stereotypes: Examining the (dis)abilities{' '}
                        of a child learning to computer program and read.
                    </a> International Journal of Learning and Media, 3(3), 15-41.
                </li>
                <li>
                    Resnick, M. (2012).{' '}
                    <a href="http://www.media.mit.edu/~mres/papers/mothers-day-warrior-cats.pdf">
                        Mother&apos;s Day, warrior cats, and Digital Fluency: Stories from the Scratch Online Community
                    </a>. Proceedings of the Constructionism 2012 conference. Athens, Greece.
                </li>
                <li>
                    Rizvi, M., &amp; Humphries, T. (2012).{' '}
                    <a href="http://www.computer.org/csdl/proceedings/fie/2012/1353/00/06462491-abs.html">
                        A Scratch-based CS0 course for at-risk computer science majors.
                    </a> 2012 Frontiers in Education Conference Proceedings, IEEE  (pp. 1-5).
                </li>
                <li>
                    Roque, R. (2012){' '}
                    <a href="http://llk.media.mit.edu/papers/ricarose-thesis.pdf">
                        Making Together: Creative Collaboration for Everyone
                    </a>. Masters Thesis, MIT Media Lab
                </li>
                <li>
                    Monroy-Hernández, A., Hill, B.M., Gonzalez-Rivero, J., boyd, d. (2011).{' '}
                    <a href="http://info.scratch.mit.edu/sites/infoscratch.media.mit.edu/files/file/monroy-hernandez_et_al_chi2011.pdf">
                        Computers can&apos;t give credit: How automatic attribution falls short{' '}
                        in an online remixing community
                    </a>. ACM Conference on Human Factors on Human Factors in Computer Systems (CHI &apos;11),
                </li>
                <li>
                    Rizvi, M., Humphries, T., Major, D., Lauzun, H., &amp; Jones, M. (2011).{' '}
                    <a href="http://dl.acm.org/citation.cfm?id=1859166">
                        A new CS0 course for at-risk majors.
                    </a> Software Engineering Education and Training (CSEE&amp;T),{' '}
                    2011 24th IEEE-CS Conference (pp. 314-323).
                </li>
                <li>
                    Brennan, K., Resnick, M., and Monroy-Hernandez, A. (2010).{' '}
                    <a href="http://www.media.mit.edu/~mres/papers/NDYD-final.pdf">
                        Making projects, making friends: Online community as a catalyst for interactive media creation
                    </a>. New Directions for Youth Development, 2010 (128), 75-83.
                </li>
                <li>
                    Hill, B.M, Monroy-Hernández, A., Olson, K.R. (2010){' '}
                    <a href="http://download.scratch.mit.edu/hill_monroy-hernandez_olson_ICWSM10.pdf">
                        Responses to remixing on a social media sharing website
                    </a>. In AAAI International Conference on Weblogs and Social Media (
                    <a href="http://www.aaai.org/ocs/index.php/ICWSM/ICWSM10/paper/view/1533">
                        ICWSM &apos;10
                    </a>)
                </li>
                <li>
                    Maloney, J., Resnick, M., Rusk, N., Silverman, B., Eastmond, E. (2010).{' '}
                    <a href="http://web.media.mit.edu/~jmaloney/papers/ScratchLangAndEnvironment.pdf">
                        The Scratch Programming Language and Environment
                    </a>. ACM Transactions on Computing Education, November 2010.
                </li>
                <li>
                    Monroy-Hernández, A., and Hill, B. M. (2010).{' '}
                    <a href="http://download.scratch.mit.edu/cscw2010poster2.pdf">
                        Cooperation and attribution in an online community of young creators
                    </a>. Poster in ACM Conference on Computer Supported Cooperative Work (CSCW &apos;10)
                </li>
                <li>
                    Aragon, C. R., Poon, S. S., Monroy-Hernández, A., Aragon, D. (2009).{' '}
                    <a href="http://download.scratch.mit.edu/tale2onlinecommunities_CC.pdf">
                        A tale of two online communities: fostering collaboration and creativity{' '}
                        in scientists and children
                    </a>. In <em>Proceeding of the seventh ACM conference on Creativity and cognition</em>
                    (C&amp;C &apos;09). ACM, New York, NY, USA,{' '}
                    <a href="http://doi.acm.org/10.1145/1640233.1640239">
                        9-18
                    </a>.
                </li>
                <li>
                    Brennan, K. (2009).{' '}
                    <a href="http://portal.acm.org/citation.cfm?id=1599503.1599529">
                        Scratch-Ed: An online community for Scratch educators
                    </a>. CSCL&apos;09 conference proceedings.
                </li>
                <li>
                    Brennan, K., Monroy-Hernández, A., &amp; Resnick, M. (2009).{' '}
                    <a href="http://portal.acm.org/citation.cfm?id=1599503.1599576">
                        Scratch: Creating and sharing interactive media
                    </a>. In Proceedings of the 9th international conference on{' '}
                    Computer supported collaborative learning - Volume 2 (CSCL&apos;09)
                </li>
                <li>
                    Monroy-Hernández, A. (2009).{' '}
                    <a href="http://download.scratch.mit.edu/websci09-andresmh.pdf">
                        Designing a website for creative learning
                    </a>. In:{' '}
                    <a href="http://journal.webscience.org/253/">
                        Proceedings of the Web Science 09: Society On-Line, 18-20 March 2009
                    </a>, Athens, Greece.
                </li>
                <li>
                    Resnick, M., Maloney, J., Monroy-Hernández, A., Rusk, N., Eastmond, E., Brennan, K.,{' '}
                    Millner, A., Rosenbaum, E., Silver, J., Silverman, B., Kafai, Y. (2009).{' '}
                    <a href="http://web.media.mit.edu/~mres/papers/Scratch-CACM-final.pdf">
                        Scratch: Programming for All
                    </a>. Communications of the ACM, November 2009.
                </li>
                <li>Kafai, Y., Desai, S., Peppler, K., Chiu, G. &amp; Moya, J. (2008).{' '}
                    Mentoring Partnerships in a Community Technology Center: A Constructionist Approach for{' '}
                    Fostering Equitable Service Learning. Mentoring and Mentorship. [For a copy, please contact{' '}
                    <a
                        className="external"
                        href="http://www.gse.upenn.edu/faculty/kafai"
                    >
                        Professor Kafai
                    </a>]
                </li>
                <li>
                    Maloney, J., Peppler, K., Kafai, Y., Resnick, M., and Rusk, N. (2008).{' '}
                    <a
                        className="external"
                        href="http://www.media.mit.edu/~mres/papers/sigcse-08.pdf"
                    >
                        Programming by Choice: Urban Youth Learning Programming with Scratch
                    </a>.
                </li>
                <li>Monroy-Hernández, A. and Resnick, M. (2008).{' '}
                    <a
                        className="external"
                        href="http://mags.acm.org/interactions/20080304/?pg=52"
                    >
                        <span className="external">
                            Empowering kids to create and share programmable media
                        </span>
                    </a>. <em>interactions</em> 15, 2 (March 2008),{' '}
                    <a href="http://doi.acm.org/10.1145/1340961.1340974">
                        50-53
                    </a>.
                </li>
                <li>
                    Kafai, Y.B., Peppler, K.A., &amp; Chiu, G. (2007).{' '}
                    <a
                        className="external"
                        href="http://download.scratch.mit.edu/CandT_scratch_Fin.pdf"
                    >
                        High Tech Programmers in Low Income Communities: Creating a Computer Culture{' '}
                        in a Community Technology Center
                    </a>. In C. Steinfeld, B. Pentland, M. Ackermann, &amp; N. Contractor (Eds.),{' '}
                    Proceedings of the Third International Conference on Communities and Technology{' '}
                    (pp. 545-562). New York: Springer.
                </li>
                <li>
                    Malan, D.J., &amp; Leitner, H.H. (2007).{' '}
                    <a href="http://cs.harvard.edu/malan/publications/fp079-malan.pdf">
                        Scratch for budding computer scientists.
                    </a> ACM SIGCSE Bulletin, 39, 223–227.
                </li>
                <li>
                    Monroy-Hernández, A. (2007).{' '}
                    <a href="http://download.scratch.mit.edu/idc07.pdf">
                        ScratchR: sharing user-generated programmable media
                    </a>. In <em>Proceedings of the 6th international conference{' '}
                    on Interaction design and children</em>{' '}
                    (IDC &apos;07). ACM, New York, NY, USA,{' '}
                    <a href="http://doi.acm.org/10.1145/1297277.1297315">
                        167-168
                    </a>.
                </li>
                <li>
                    Peppler, K. &amp; Kafai, Y. B. (2007).{' '}
                    <a
                        className="external"
                        href="http://download.scratch.mit.edu/CSCL07_peppler.pdf"
                    >
                        Collaboration, Computation, and Creativity: Media Arts Practices in Urban Youth Culture
                    </a>. In C. Hmelo- Silver &amp; A. O&apos;Donnell (Eds.), Proceedings of the Conference{' '}
                    on Computer Supported Collaborative Learning, New Brunswick, NJ.
                </li>
                <li>
                    Peppler, K. &amp; Kafai, Y. B. (2007). From SuperGoo to Scratch:{' '}
                    Exploring Media Creative Production in an Informal Learning Environment.{' '}
                    Journal on Learning, Media, and Technology, 32(2), 149-166.&nbsp;[For a copy,{' '}
                    please contact{' '}
                    <a
                        className="external"
                        href="http://www.gse.upenn.edu/faculty/kafai"
                        style={{
                            margin: '0px',
                            padding: '0px',
                            color: 'rgb(42, 84, 170)',
                            outlineStyle: 'none',
                            outlineWidth: 'medium',
                            textDecoration: 'none'
                        }}
                    >
                        Professor Kafai
                    </a>]
                </li>
                <li>
                    Peppler, K. A. &amp; Kafai, Y. B. (2007).{' '}
                    <a
                        className="external"
                        href="http://download.scratch.mit.edu/DiGRA07_games_kafai.pdf"
                    >
                        What video game making can teach us about learning and literacy:{' '}
                        Alternative pathways into participatory cultures
                    </a>. Paper to be presented at the Digital International Games Research Association{' '}
                    meeting in Tokyo, Japan.
                </li>
                <li>
                    Resnick, M. (2007).{' '}
                    <a
                        className="external"
                        href="http://web.media.mit.edu/%7Emres/papers/kindergarten-learning-approach.pdf"
                    >
                        All I Really Need to Know (About Creative Thinking) I Learned{' '}
                        (By Studying How Children Learn) in Kindergarten.
                    </a> Proceedings of the SIGCHI Conference on Creativity and Cognition, Washington, D.C.
                </li>
                <li>
                    Resnick, M. (2007).{' '}
                    <a
                        className="external"
                        href="http://web.media.mit.edu/~mres/papers/Learning-Leading-final.pdf"
                    >
                        Sowing the Seeds for a More Creative Society
                    </a>. Learning and Leading with Technology.
                </li>
                <li>
                    Resnick, M., Maloney, J., &amp; Rusk, N. (2006).{' '}
                    <a
                        className="external"
                        href="http://download.scratch.mit.edu/Scratch-Overview-Slide.ppt"
                    >
                        Scratch and technological fluency (Powerpoint slide 2.5MB)
                    </a>.
                </li>
                <li>
                    Peppler, K., &amp; Kafai, Y. (2005).{' '}
                    <a
                        className="external"
                        href="http://download.scratch.mit.edu/CreativeCoding.pdf"
                    >
                        Creative coding: The role of art and programming in the K-12 educational context
                    </a>.
                </li>
                <li>
                    Resnick, M., and Silverman, B. (2005).{' '}
                    <a
                        className="external"
                        href="http://web.media.mit.edu/~mres/papers/IDC-2005.pdf"
                    >
                        Some Reflections on Designing Construction Kits for Kids
                    </a>. Proceedings of Interaction Design and Children conference, Boulder, CO.
                </li>
                <li>
                    Maloney, J., Burd, L., Kafai, Y., Rusk, N., Silverman, B., and Resnick, M. (2004).{' '}
                    <a
                        className="external"
                        href="https://llk.media.mit.edu/papers/ScratchSneakPreview.pdf"
                    >
                        Scratch: A Sneak Preview
                    </a>. Second International Conference on Creating, Connecting, and Collaborating{' '}
                    through Computing. Kyoto, Japan, pp. 104-109.
                </li>
            </ul>
            <h3><FormattedMessage id="research.grants" /></h3>
            <ul>
                <li>
                    Resnick, M., Rusk, N., &amp; Dasgupta, S. (2013).{' '}
                    <a
                        className="external"
                        href="http://nsf.gov/awardsearch/showAward?AWD_ID=1417663"
                    >
                        New Pathways into Data Science: Extending the Scratch Programming Language to Enable{' '}
                        Youth to Analyze and Visualize Their Own Learning
                    </a> (NSF DRL-1417663).
                </li>
                <li>
                    Resnick, M., Ito, M., Gasser, U., &amp; Rusk, N. (2013).{' '}
                    <a
                        className="external"
                        href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=1348876"
                    >
                        Coding for All: Interest-Driven Trajectories to Computational Fluency
                    </a> (NSF IIS-1348876).
                </li>
                <li>
                    Bers, M., &amp; Resnick, M. (2011).{' '}
                    <a
                        className="external"
                        href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=1118664"
                    >
                        ScratchJr: Computer Programming in Early Childhood Education as a Pathway to{' '}
                        Academic Readiness and Success
                    </a> (NSF DRL-1118682).
                </li>
                <li>
                    Resnick, M., Kafai, Y., Benkler, Y., Rusk, N., Maloney, J., &amp; Monroy-Hernández,{' '}
                    A. (2010).{' '}
                    <a
                        className="external"
                        href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=1027848"
                    >
                        Preparing the Next Generation of Computational Thinkers: Transforming Learning{' '}
                        and Education Through Cooperation in Decentralized Networks
                    </a> (NSF DRL-1027848).
                </li>
                <li>
                    Resnick, M., &amp; Brennan, K. (2010).{' '}
                    <a
                        className="external"
                        href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=1019396"
                    >
                        ScratchEd: Working with Teachers to Develop Design-Based Approaches to the{' '}
                        Cultivation of Computational Thinking
                    </a> (NSF DRL-1019396).
                </li>
                <li>
                    Resnick, M., Maloney, J., Rusk, N., &amp;  Monroy-Hernández, A. (2010).{' '}
                    <a
                        className="external"
                        href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=1002713"
                    >
                        Scratch 2.0: Cultivating Creativity and Collaboration in the Cloud
                    </a> (NSF IIS-1002713).
                </li>
                <li>
                    Resnick, M., Kafai, Y., Maloney, J., Rusk, N., &amp; Maeda, J. (2003).{' '}
                    <a
                        className="external"
                        href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=0325828"
                    >
                        A Networked, Media-Rich Programming Environment to Enhance Technological Fluency{' '}
                        at After-School Centers in Economically-Disadvantaged Communities
                    </a> (NSF ITR-0325828).
                </li>
            </ul>
        </div>
    </InformationPage>
);

Research.propTypes = {
    intl: intlShape
};

const IntlResearch = injectIntl(Research);

render(<Page><IntlResearch /></Page>, document.getElementById('app'));
