import { Helmet } from 'react-helmet';

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to MedEarn ',
    description: 'We sell used unused medicines',
    keywords:'buy medicines, sell medicines, buy used medicines, buy unused medicines, medicine information, disease Information,medicine, cheap medicines'
}

export default Meta