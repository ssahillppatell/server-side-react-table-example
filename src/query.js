import { gql } from "@apollo/client";

export const DOCTORS_QUERY = gql`
query GetDoctors($index: Int, $limit: Int, $sort: String, $query: String){
    getDoctors(index: $index, limit: $limit, sort: $sort, query: $query) {
      info {
        count
      }
      data {
        id
        firstName
        middleName
        lastName
        email
        phone
        description
        baseCity
        pan
        mci
        dob
        tan
        gender
        primarySpecialization
        secondarySpecialization
        qualifications
        yearOfExperience
        languages
        places {
          id
          placeType
          name
          branchId
          branchName
          erxBranchId
          location {
            lat
            lon
          }
          address
          pincode
          state
          city
          consultationFee
          followUpFee
          drlConsultationFee
          drlFollowUpFee
          catalogueConsultationFee
          catalogueFollowUpFee
          drlPricePercent
          drlCataloguePricePercent
          numberFollowUp
          followUpDuration
          insuranceProviderId
          isActive
        }      
        erxServiceProvider
        erxDoctorId
        profilePicture
        primeDoctor
        googleReview
        familyDoctor
        numberOfCustomerAllowedPerFamily
        bank {
          bankName
          branchName
          accountHolderName
          accountNumber
          ifscCode
        }
        kam {
          id
          name
          phone
        }
        consultationType
        eConsultation {
          consultationFee
          followUpFee
          drlFollowUpFee
          drlConsultationFee
          catalogueConsultationFee
          catalogueFollowUpFee
          drlPricePercent
          drlCataloguePricePercent
          numberFollowUp
          followUpDuration
          insuranceProviderId
        }
        createdAt
        createdBy
        updatedAt
        updatedBy
        isActive
      }
    }
  }
`
