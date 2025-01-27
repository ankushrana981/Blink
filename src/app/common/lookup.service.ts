import { Component, PLATFORM_ID, Injectable,Injector, NgZone, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BaseComponent } from './commonComponent';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {config} from '../../assets/config/configs-sample';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";

// import { ToasterService, ToasterConfig } from 'angular2-toaster';
@Injectable({
  providedIn: "root"
})
export class LookupService {
  authorised: any = false;
  constructor(injector: Injector,
    public _http: HttpClient,
    // public toasterService:ToasterService,
   
    
  
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    this._apiUrl = this.config.apiUrl;
    this.router = injector.get(Router)
   

  }
  public router: Router;
  public swal = swal;
  public config = <any>config;
  public _apiUrl = "";
  public platformId;

  public getToken(key:any) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(key);
    }
    return null
  }
  public setToken(key:any, value:any) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem(key, value);
    }
  }
  

  public getMonday(d:any) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

public getPaymentMode = (mode: any) => {
    switch (mode) {
        case 1: case "1": return "Cash";
        case 2: case "2": return "Check";
        case 3: case "3": return "Transfer";
        case 4: case "4": return "Credit card";
    }
    return "Unidentified";
};

public getBusinessPartnerType = (type: number) => {
    switch (type) {
        case 1: return "client";
        case 2: return "vendor";
    };
    return null
}

public getNumericBusinessPartnerType = (type: string) => {
    switch (type) {
        case "client": return 1;
        case "vendor": return 2;
    };
    return null
}

public getBusinessPartnerStatus = (type: number) => {
    switch (type) {
        case 0: return "Unknown";
        case 1: return "Active";
        case 2: return "Non Active";
        case 3: return "Ordering Customer";
        case 4: return "Non Ordering Customer";
    }
    return null
} 

public getBusinessPartnerApprovalReason = (type: number, isVendor: boolean) => {
    switch (type) {
        case 1:
            if (isVendor) {
                return "Vendor Name";
            }
            return "Customer Name";
        case 2: return "Contact Person";
        case 3: return "Company";
        case 4: return "Address1";
        case 5: return "Address2";
        case 6: return "City";
        case 7: return "State";
        case 8: return "Country";
        case 9: return "Zip code";
        case 10: return "Phone1";
        case 11: return "Phone2";
        case 12: return "Email";
        case 13: return "Website";
        case 14: return "Status";
        case 15: return "Internal Notes";
        case 16: return "External Notes";
        case 17: return "Payment Term Duration";
        case 18: return "Sales Representative";
        case 19: return "Area";
        case 20: return "Region";
        case 21: return "Establishment Type";
    }
    return "Unknown";
};

public getProductApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "Title";
        case 2: return "Price";
        case 3: return "Description";
        case 4: return "Brand";
        case 5: return "Product Category";
        case 6: return "Printer";
        case 7: return "Packaging";
        case 8: return "Packaging Details";
        case 9: return "Unit of Measure";
        case 10: return "Is POS Applicable";
        case 11: case 12: case 13: return "Image";
    }
    return "Unknown";
};

public getNumericDocumentType = (type: string) => {
    switch (type.toLowerCase()) {
        case "invoice": return 1;
        case "inventoryrequest": return 2;
        case "purchaseorder": return 3;
    };
    return null
}
public getDocumentType = (type: number) => {
    switch (type) {
        case 1: return "Invoice";
        case 2: return "Inventoryrequest";
        case 3: return "purchaseorder";
    };
    return null
}
public getUnitType = (type: any) => {
    switch (type) {
        case 1: case "1": return "Hourly";
        case 2: case "2": return "Daily";
        case 3: case "3": return "Weekly";
        case 4: case "4": return "Monthly";
        case 5: case "5": return "Mileage";
        case 6: case "6": return "Length";
        case 7: case "7": return "Distance";
        case 8: case "8": return "Time";
        case 9: case "9": return "Pieces";
    };
    return null
}
public getUnitTypeToView = (type: any) => {
    switch (type) {
        case 1: case "1": return "Hours";
        case 2: case "2": return "Days";
        case 3: case "3": return "Weeks";
        case 4: case "4": return "Months";
        case 5: case "5": return "Mileages";
        case 6: case "6": return "Length";
        case 7: case "7": return "Distance";
        case 8: case "8": return "Times";
        case 9: case "9": return "Pieces";
    };
    return null
}
public getUnitTypeToViewSingularForm = (type: any) => {
    switch (type) {
        case 1: case "1": return "Hour";
        case 2: case "2": return "Day";
        case 3: case "3": return "Week";
        case 4: case "4": return "Month";
        case 5: case "5": return "Mileage";
        case 6: case "6": return "Length";
        case 7: case "7": return "Distance";
        case 8: case "8": return "Time";
        case 9: case "9": return "Piece";
    };
    return null
}
public getCompletePaymentStatus = (type: boolean) => {
    if (type == true) {
        return "Completed";
    } else {
        return "On Progress";
    }
}
public getActionType = (type: number) => {
    switch (type) {
        case 1: return "added";
        case 2: return "edited";
        case 3: return "deleted";
        case 4: return "changes rejected";
        case 5: return "processed";
        case 6: return "reconciled";
        case 7: return "partially paid";
        case 8: return "paid";
        case 9: return "changes approved";
        case 10: return "manufacturing started";
        case 11: return "completed";
        case 12: return "received";
        case 13: return "adjusted";
        case 14: return "read";
        case 15: return "submitted";
        case 16: return "approval requested";
        case 17: return "invited";
        case 18: return "pending discussion agreement";
        case 19: return "pending conclusion agreement";
        case 20: return "discussion agreed";
        case 21: return "conclusion agreed";
        case 22: return "production requested";
        case 23: return "activated";
    };
    return null
};

public getClientType = (type: number) => {
    switch (type) {
        case 1: return "Customer";
        case 2: return "Contact";
        case 3: return "Company";
        case 4: return "Vendor";
    }
    return "Unknown";
}

public getTaskCompleted = (type: any) => {
    switch (type) {
        case true: return "YES";
        case false: return "NO";
    }
    return "";
};

public getNumericAccessLevel = (level: string) => {
    switch (level) {
        case "Level1": return 1;
        case "Level2": return 2;
        case "Level3": return 3;
        case "Level4": return 4;
    }
    return 0;
};

public getAccessLevel = (level: number) => {
    switch (level) {
        case 1: return "Level 1";
        case 2: return "Level 2";
        case 3: return "Level 3";
        case 4: return "Level 4";
    }
    return "None";
};

public setDiscountType = (record: any) => {
    if (record.discountType == 1 || record.discountType == "Discount") {
        record.discountType = "Discount";
        return "Discount";
    }
    else if (record.discountType == 2 || record.discountType == "TargetPrice") {
        record.discountType = "TargetPrice";
        return "Target Price";
    }
    return null
};

public getAccessLevelList = () => {
    return [
        { id: 0, title: "None" },
        { id: 1, title: "Level 1" },
        { id: 2, title: "Level 2" },
        { id: 3, title: "Level 3" },
        { id: 4, title: "Level 4" },
    ];
};

public getTaskTypeList = () => {
    return [
        { id: 1, title: "General" },
        { id: 2, title: "Customer" },
        { id: 6, title: "Company" },
        { id: 7, title: "Contact" },
        { id: 4, title: "Product" },
    ];
};
public getTaskType = (type: number) => {
    switch (type) {
        case 1: return "General";
        case 2: return "Customer";
        case 3: return "Division";
        case 4: return "Product";
        case 6: return "Company";
        case 7: return "Contact";

    }
    return "";
};
public getNoteTypeList = () => {
    return [
        { id: 1, title: "General" },
        { id: 2, title: "Customer" },
        { id: 4, title: "Company" },
        { id: 5, title: "Contact" },
        { id: 3, title: "Task" }

    ];
};
public getNoteType = (type: number) => {
    switch (type) {
        case 1: return "General";
        case 2: return "Customer";
        case 3: return "Task";
        case 4: return "Company";
        case 5: return "Contact";

    }
    return "None";
};
public getStatusType = (type: any) => {
    switch (type) {
        case 1: case "1": return "Active";
        case 2: case "2": return "Completed";
        case 3: case "3": return "InDefinite Hold";
    }
    return "None";
};

public getCategoryStatusType = (type: any) => {
    switch (type) {
        case 1: case "1": return "Pending Approval";
        case 2: case "2": return "Approved";
        case 3: case "3": return "Rejected";
        case 4: case "4": return "Pending Reconciliation";
        case 5: case "5": return "Pending Add Approval";
        case 6: case "6": return "Submitted";
        case 8: case "8": return "Pending Final Approval";
        case 9: case "9": return "Reconciled";
        case 10: case "10": return "Pending Edit Approval";
    }
    return "None";
};

public getCategoryRequestType = (type: any) => {
    switch (type) {
        case 1: case "1": case 3: case "Preset": return "Preset";
        case 2: case "2": case 4: case "Custom": return "Custom";
        //case 3: case "Preset": return "Preset";
        //case 4: case "Custom": return "Custom";
    }
    return "None";
};

public getDocumentApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "invoice discount changed";
        case 2: return "price changed";
        case 3: return "line item discount changed";
        case 4: return "line item price changed";
        case 5: return "client notes changed";
        case 6: return "product description changed";
        case 7: return "line quantity changed";
        case 8: return "item added";
        case 9: return "item removed";
        case 10: return "processing date changed";
        case 11: return "receiving date changed";
        case 13: return "date of issue changed";
        case 14: return "Source Cost Changed";
        case 15: return "Origin LogisticsCost Changed";
        case 16: return "Shipping Cost Changed";
        case 17: return "Broker Cost Changed";
        case 18: return "Destination Taxes Changed";
        case 19: return "Duties Changed";
        case 20: return "Destination Logistics Changed";
        case 21: return "OtherCosts Changed";
        case 22: return "Unit Changed";
        case 23: return "Unit Type Changed";
        case 24: return "Product Changed";
    }
    return "Unknown";
};

public getExpenseApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "date will change";
        case 2: return "description will change";
        case 3: return "amount will change";
        case 4: return "offset ledger entry will be add";
        case 5: return "external source entry will be add";
        case 6: return "offset ledger with external source added";
    }
    return "Unknown";
};

public getTaskApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "date of entry will change";
        case 2: return "due date will change";
        case 3: return "title will change";
        case 4: return "subtitle will change";
        case 5: return "note will change";
        case 6: return "type of task will be change"
        case 7: return "customer will be changed"
        case 8: return "contact will be changed"
        case 9: return "company will be changed"
        case 10: return "product will be changed"

    }
    return "Unknown";
};

public getDiscountRuleApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "discount/TargetPrice will change";
    }
    return "Unknown";
};

public getCategoryRequestApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "Product quantity will change";
        case 2: return "Monetary value will change";
        case 3: return "Product quantity will change";
        case 4: return "Monetary value will change";
        case 5: return "Quantity will change";
    }
    return "Unknown";
};

public getTaxRuleApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "tax value will change";
    }
    return "Unknown";
};


public getPaymentApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "Price will change";
    }
    return "Unknown";
};

public getDocumentStatus = (status: number, pendingPayment?: number, totalAmount?: number, isInternalInventoryRequest?: boolean, isPOS: boolean = false, vendorType?: number, enableVendorAutomation?: boolean) => {
    switch (status) {
        case 1: return "Draft";
        case 2:
            if (isInternalInventoryRequest && vendorType == 3) {
                return "Status Vendor Approval";
            }
            return "Pending Approval";
        case 3: return "Pending Processing";
        case 4: return "Pending Reconciliation";
        case 5:
            if ((totalAmount! - pendingPayment!) > 0 && (totalAmount! - pendingPayment!) < totalAmount!) {
                return "Partially Paid"
            }
            return "Pending Payment";
        case 6: return "Rejected";
        case 7:
            if ((pendingPayment! < 0 || (totalAmount! - pendingPayment!) < 0) && !isPOS) {
                return "OverPaid";
            }
            return "Paid";
        case 8: return "Cancelled";
        case 9: return "Receivables";
        case 10:
            if (isInternalInventoryRequest) {
                return "IIR Delivered";
            }
            return "Submitted";
        case 11: return "PO Generated";
        case 12: return "PO Sent to Vendor";
        case 13: return "Received";
        case 15: return "PO Delivered From Vendor";
        case 16: return "PO Awaiting Approval";
        case 17: return "PO Processing";
        case 18: return "IIR Received";
        case 19: return "PO Vendor Changes Approved";
        case 20:
            if (isInternalInventoryRequest) {
                return "Pending Adjustment Approval";
            }
            return "Pending Approval";
        case 21: return "Pending Processing";
        case 22: return "Pending Date Change Approval";
        case 23: return "Over Paid";
    }
    return "Unidentified";
};


public getExpenseStatus = (status: number, isInventoryCount?: boolean) => {
    switch (status) {
        case 1:
            if (isInventoryCount) {
                return "On Progress";
            }
            return "Draft";
        case 2: case 8: return "Pending Approval";
        case 3:
            if (isInventoryCount) {
                return "Reconciled";
            }
            return "Approved";
        case 4:
            if (isInventoryCount) {
                return "Reconciled";
            }
            return "Submitted";
        case 5: return "Rejected";
        case 6: return "Pending Delete Approval";
        case 9: return "Reconciled";
    }
    return "Unidentified";
};

public getDocumentEditStatus = (status: number) => {
    switch (status) {
        case 1: return "";
        case 2: return "Edit In Progress";
        case 3: return "Change Requested";
        case 4: return "Edit In Progress";
        case 5: return "Change Requested";
        case 6: return "Edit In Progress";
        case 7: return "Redraft Requested";
        case 8: return "Redraft Requested";
        case 9: return "Pending Payment";
        case 10: return "Partially Paid";
        case 11: return "Paid";
    }
    return "Unidentified";
};

public getDocumentEditStatusByLevel = (level: number) => {
    switch (level) {
        case 1:
            return "DocumentNotEdited";
        case 2:
            return "InEditModeByLevelTwo";
        case 3:
            return "InEditModeByLevelThree";
        case 4:
            return "InEditModeByLevelFour";

    }
    return "Unidentified";
};

public getDocumentEditApprovalStatusByLevel = (level: number) => {
    switch (level) {
        case 1:
            return "DocumentNotEdited";
        case 2:
            return "RequestApprovalByLevelTwo";
        case 3:
            return "RequestApprovalByLevelThree";
        case 4:
            return "InEditModeByLevelFour";

    }
    return "Unidentified";
};

public getAdjustmentCategoryType = (type: any) => {
    switch (type) {
        case false:
            return "Decrease";
        case true:
            return "Increase";
    }
    return "Unidentified";
}

public getAdjustmentEntryType = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "PO";
        case 2: case "2":
            return "Inventory Reconciliation";
        case 3: case "3":
            return "General";
        case 4: case "4":
            return "Inventory Count";
        case 5: case "5":
            return "Manufacturing";
    }
    return "Unidentified";
}

public getModifierAttached = (type: any) => {
    switch (type) {
        case 0: case "0":
            return "Dettached";
        case 1: case "1":
            return "Attached to Products";
        case 2: case "2":
            return "Attached to Category";
        case 3: case "3":
            return "Attached to Whole Receipt";
        case 4: case "4":
            return "Attached to Brand";
    }
    return "Unidentified";
}

public getMoneyType = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Paper";
        case 2: case "2":
            return "Coin";
    }
    return "Unidentified";
}

public getTriggers = (type: any) => {
    switch (type) {
        case 0: case "0":
            return "Triggers Not Applicable";
        case 1: case "1":
            return "Date";
        case 2: case "2":
            return "Time";
        case "1,2": case "2,1":
            return "Date and Time";
    }
    return "Unidentified";
}

public getDiscountRuleTriggers = (type: any) => {
    if (type != null) {
        return "Triggers Applicable";
    } else {
        return "Triggers Not Applicable";
    }
}

public getPosDiscountRuleApprovalReason = (type: number) => {
    switch (type) {
        case 1:
            return "discount will change";
    }
    return "UnKnown";
}

public getUOMType = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Metric";
        case 2: case "2":
            return "Imperial";
    }
    return "UnKnown";
}

public getUOMState = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Dry";
        case 2: case "2":
            return "Liquid";
    }
    return "UnKnown";
}

public getManufacturingStatus = (status: number) => {
    switch (status) {
        case 1:
            return "Manufacturing Pending";
        case 2:
            return "Production Requested";
        case 3: case 8: case 11: case 12: case 13: case 14:
            return "Pending Approval";
        case 4:
            return "Manufacturing";
        case 5:
            return "Manufacturing Completed"
        case 6:
            return "Manufacturing Reviewed";
        case 7:
            return "Rejected";
        case 9:
            return "Pending Approval";
        case 10:
            return "Discrepancy Needing Approval";
    }
    return "unidentified";
}

public getProductionApprovalReason = (type: any) => {
    switch (type) {
        case 1:
            return "Product will Change";
        case 2:
            return "Composition will Change";
        case 3:
            return "Quantity will Change";
        case 4:
            return "Branch will Change";
        case 5:
            return "will Change";
        case 8:
            return "Weight will Change";
        case 9:
            return "Product Packs Will Change";
        case 10:
            return "Manufactured Date Will Change";
        case 11:
            return "Manufacturing Completion Date Will Change";
        case 12:
            return "Production Request Date Will Change";
    }
    return "UnIdentified";
}

public getUOMTypeList = (showPieces: boolean) => {
    var uomList = [
        { id: 1, title: "Dry" },
        { id: 2, title: "Liquid" }
    ]
    if (showPieces) {
        var pieces = { id: 3, title: "Pieces" };
        uomList.push(pieces)
    }
    return uomList;
};

public getIngredientsCalculationList = () => {
    return [
        { id: 1, title: "Quantity" },
        { id: 2, title: "Percent" }
    ];
}

public getFollowThrough = () => {
    return [
        { id: 1, title: "Customer Info" },
    ];
}

public getOtherFollowThrough = () => {
    return [
        { id: 1, title: "Location" },
        { id: 2, title: "Time & Date" },
        { id: 3, title: "Take Picture" }
    ];
}

public getUOMList = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Dry";
        case 2: case "2":
            return "Liquid";
        case 3: case "3":
            return "Pieces";
    }
    return "N/A";
}

public truncateDecimal = (price:any, currency:any, isRound?: boolean) => {
    if (isNaN(price) || price === "" || price === null) {
        return;
    }
    else if (currency != 'Rp ') {
        return price;
    }
    if (isRound) {
        return Math.round(price);
    } else if (price > 0) {
        return Math.floor(price);
    } else {
        return Math.ceil(price);
    }
}

public getBroadCastList = () => {
    return [
        { id: 1, title: "Branch" },
        { id: 2, title: "Department" },
        { id: 3, title: "Division" }
    ];
};

public getTransactionList = () => {
    return [
        { id: 1, title: "Invoice" },
        { id: 2, title: "IIR" },
        { id: 3, title: "PO" },
        { id: 4, title: "Adjustment" },
        { id: 5, title: "Manufacturing" }
    ];
};

public getManagementMeeting = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Created";
        case 2: case "2":
            return "In Progress";
        case 3: case "3":
            return "Closed";
        case 4: case "4":
            return "Meeting Started";
        case 5: case "5":
            return "In Progress";
        case 6: case "6":
            return "Discussion Started";
        case 7: case "7":
            return "Discussion Ended";
        case 8: case "8":
            return "Pending Meeting Content Confirmation";
        case 9: case "9":
            return "Pending Meeting Conclusion Confirmation";
        case 10: case "10":
            return "Topic Concluded";
        case 11: case "11":
            return "Agreement Reached";
    }
    return "UnIdentified";
}

public getMeetingProgression = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "";
        case 2: case "2": case 4: case "4": case 5: case "5": case 6: case "6":
            return "Discussion";
        case 9: case "9": case 3: case "3":
            return "MOM";
        case 10: case "10": case 8: case "8":
            return "MOM Conclusion";
        case 7: case "7":
            return "Meeting";
    }
    return "UnIdentified";
}

public getProgressionDetails = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Agenda Created By";
        case 2: case "2":
            return "Started By";
        case 9: case "9":
            return "Submitted By";
        case 4: case "4":
            return "Ended By";
        case 5: case "5":
            return "Concluded By";
        case 6: case "6":
            return "Agreement Reached By";
        case 7: case "7":
            return "Closed By";
        case 10: case "10":
            return "Submitted By";
        case 3: case "3": case 8: case "8":
            return "Confirmed By";
    }
    return "UnIdentified";
}

public getCloseMeetingList = () => {
    return [
        { id: 1, title: "Topic Conclusion" },
        { id: 2, title: "Agreement Reached" },
        { id: 3, title: "Meeting Closed" }
    ];
};

public getCloseMeetingStatus = (type: number) => {
    switch (type) {
        case 1:
            return "TopicConclusion";
        case 2:
            return "AgreementReached";
        case 3:
            return "Closed";
    }
    return "unidentified";
}
public getCustomerStatus = (type: any) => {
    switch (type) {
        case 1:
            return "Draft";
        case 2:
            return "On Progress";
        case 3:
            return "Submitted";
        case 4:
            return "Saved to Resume";
        case 5:
            return "Pending Approval";
        case 6:
            return "Retracted";
    }
    return "Unidentified";
}

public getOuterPackaging = (type: any) => {
    switch (type) {
        case true: return "Yes";
        case false: return "No";
    }
    return "No";
};

public getDateRangeFilterList = () => {
    return [
        { id: 1, title: "Year to Date" },
        { id: 2, title: "Month to Date" },
        { id: 3, title: "Quarter 1" },
        { id: 4, title: "Quarter 2" },
        { id: 5, title: "Quarter 3" },
        { id: 6, title: "Quarter 4" },
    ];
};
public getCustomerOrderFilterList = () => {
    return [
        { id: 1, title: "Selected Dates" },
        { id: 2, title: "One Month" },
        { id: 3, title: "Three Months" },
        { id: 4, title: "Six Months" },
    ];
};

public getDateRangeFilterListForPLReport = () => {
    return [
        { id: 1, title: "Year" },
        { id: 2, title: "Month" },
        { id: 3, title: "Custom Date Range" },
    ];
};

public getMonthTypeForPLReport = () => {
    return [
        { id: 1, title: "Specific" },
        { id: 2, title: "Range" },
    ];
};

public getCustomerType = () => {
    return [
        { id: 1, title: "Active" },
        { id: 2, title: "In Active" },
        { id: 3, title: "In Progress - Early Stage" },
        { id: 4, title: "In Progress - Late Stage" },
    ];
};
public getDateRangeFilterListForSitRoom = () => {
    return [
        { id: 1, title: "Current Month" },
        { id: 2, title: "Custom Range" },
        { id: 3, title: "Specific Date" },
        { id: 4, title: "Quarter 1" },
        { id: 5, title: "Quarter 2" },
        { id: 6, title: "Quarter 3" },
        { id: 7, title: "Quarter 4" },
    ];
};
public changeDateRangeForSitRoom = (item:any) => {
    if (item) {
        var filter = { fromDate: new Date(), toDate: new Date() };
        var date = new Date();
        switch (item.id) {
            case 1:
                filter.fromDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
                filter.toDate.setDate((date).getDate());
                break;
            case 2:
                filter.fromDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
                filter.toDate.setDate((date).getDate());
                break;
            case 3:
                filter.fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDay(), 0, 0, 0, 0);
                filter.toDate = filter.fromDate;
                break;
            case 4:
                filter.fromDate = new Date(date.getFullYear(), 0, 1, 12, 0, 0, 0);
                filter.toDate = new Date(date.getFullYear(), 2, 31, 12, 0, 0, 0);
                break;
            case 5:
                filter.fromDate = new Date(date.getFullYear(), 3, 1, 12, 0, 0, 0);
                filter.toDate = new Date(date.getFullYear(), 5, 30, 12, 0, 0, 0);
                break;
            case 6:
                filter.fromDate = new Date(date.getFullYear(), 6, 1, 12, 0, 0, 0);
                filter.toDate = new Date(date.getFullYear(), 8, 30, 12, 0, 0, 0);
                break;
            case 7:
                filter.fromDate = new Date(date.getFullYear(), 9, 1, 12, 0, 0, 0);
                filter.toDate = new Date(date.getFullYear(), 11, 31, 12, 0, 0, 0);
                break;

        }
        return filter;
    }
    return null
}

public getSalesTypeforPLReport = () => {
    return [
        { id: 1, title: "All" },
        { id: 2, title: "Paid" },
        { id: 3, title: "UnPaid" },
    ];
};

public getPaymentStatus = (type: any) => {
    switch (type) {
        case 1:
            return "Draft";
        case 2:
            return "Offset";
        case 3:
            return "Partially Paid";
        case 4:
            return "Fully Paid";
        case 5:
            return "Retracted";
        case 6:
            return "Pending Payment";
        case 7:
            return "Pending Offset Approval";
        case 8:
            return "Over Paid";
    }
    return "unidentified";
}
public getImageExtensionType = (type: any) => {
    switch (type.toLowerCase()) {
        case "jpeg":
            return true;
        case "png":
            return true;
        case "jpg":
            return true;
        case "jpeg 2000":
            return true;
        case "exif":
            return true;
        case "tiff":
            return true;
        case "gif":
            return true;
        case "bmp":
            return true;
        case "jfif":
            return true;
    }
    return false;
}
public getExtensionType = (type: any) => {
    switch (type.toLowerCase()) {
        case "csv":
            return true;
        case "png":
            return true;
        case "ico":
            return true;
        case "svg":
            return true;
        case "jpg":
            return true;
        case "jpeg":
            return true;
        case "bmp":
            return true;
        case "gif":
            return true;
        case "tiff":
            return true;
        case "pdf":
            return true;
        case "ods":
            return true;
        case "xlr":
            return true;
        case "xls":
            return true;
        case "xlsx":
            return true;
        case "doc":
            return true;
        case "docx":
            return true;
        case "odt":
            return true;
        case "tex":
            return true;
        case "rtf":
            return true;
        case "txt":
            return true;
        case "wks":
            return true;
        case "wps":
            return true;
        case "wpd":
            return true;
        case "key":
            return true;
        case "odp":
            return true;
        case "pps":
            return true;
        case "ppt":
            return true;
        case "pptx":
            return true;
    }
    return false;
}

public getMeetingApproval = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Draft";
        case 2: case "2":
            return "PendingApproval";
        case 3: case "3":
            return "Approved";
        case 4: case "4":
            return "Submitted";
        case 5: case "5":
            return "Rejected";
        case 6: case "6":
            return "PendingDeleteApproval";
        case 7: case "7":
            return "PendingOffsetCategoryApproval";
    }
    return "UnIdentified";
}

public getTotalWeight = (ingredientList:any, totalWeight:any, istotalQuantity:any) => {
    if (ingredientList != null && ingredientList != undefined && ingredientList.unitofMeasure != null && ingredientList.unitofMeasure != undefined) {
        switch (ingredientList.unitofMeasure.unit) {
            case "kg": case "KG": case "Kg":
                totalWeight = totalWeight + ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 1000);
                break;
            case "mg": case "MG": case "Mg":
                totalWeight = totalWeight + ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 0.001);
                break;
            case "gm": case "GM": case "Gm":
                totalWeight = totalWeight + (istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity);
                break;
            case "lbs": case "LBS": case "Lbs":
                totalWeight = totalWeight + ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 453.592);
                break;
            case "l": case "L":
                totalWeight = totalWeight + ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 1000);
                break;
            case "ml": case "ML": case "Ml":
                totalWeight = totalWeight + (istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity);
                break;
            case "oz": case "OZ": case "Oz":
                totalWeight = totalWeight + ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 28.3495);
                break;
            case "fl oz": case "floz": case "Fl oz":
                totalWeight = totalWeight + ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 28.413100000128157063);
                break;
            case "gal": case "gallon": case "GALLON": case "Gal":
                totalWeight = totalWeight + ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 4546.09);
                break;
        }
    }
    return totalWeight;
}

public getPercent = (ingredientList:any, quantity:any, istotalQuantity:any) => {
    if (ingredientList != null && ingredientList != undefined && ingredientList.unitofMeasure != null && ingredientList.unitofMeasure != undefined) {
        switch (ingredientList.unitofMeasure.unit) {
            case "kg": case "KG": case "Kg":
                quantity = ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 1000);
                break;
            case "mg": case "MG": case "Mg":
                quantity = ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 0.001);
                break;
            case "gm": case "GM": case "Gm":
                quantity = (istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity);
                break;
            case "lbs": case "LBS": case "Lbs":
                quantity = ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 453.592);
                break;
            case "l": case "L":
                quantity = ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 1000);
                break;
            case "ml": case "ML": case "Ml":
                quantity = (istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity);
                break;
            case "oz": case "OZ": case "Oz":
                quantity = ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 28.3495);
                break;
            case "fl oz": case "floz": case "Fl oz":
                quantity = ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 28.413100000128157063);
                break;
            case "gal": case "gallon": case "GALLON": case "Gal":
                quantity = ((istotalQuantity ? ingredientList.totalProductionQty : ingredientList.quantity) * 4546.09);
                break;
        }
    }
    return quantity;
}

public getOriginalUOM = (unit:any, quantity:any, totalProductionQty:any) => {
    if (unit != null && unit != undefined) {
        switch (unit) {
            case "kg": case "KG": case "Kg":
                quantity = totalProductionQty;
                break;
            case "mg": case "MG": case "Mg":
                quantity = totalProductionQty * 1000000;
                break;
            case "gm": case "GM": case "Gm":
                quantity = totalProductionQty * 1000;
                break;
            case "lbs": case "LBS": case "Lbs":
                quantity = totalProductionQty * 2.20462;
                break;
            case "l": case "L":
                quantity = totalProductionQty;
                break;
            case "ml": case "ML": case "Ml":
                quantity = totalProductionQty * 1000;
                break;
            case "oz": case "OZ": case "Oz":
                quantity = totalProductionQty * 35.274;
                break;
            case "fl oz": case "floz": case "Fl oz":
                quantity = totalProductionQty * 35.1951;
                break;
            case "gal": case "gallon": case "GALLON": case "Gal":
                quantity = totalProductionQty * 0.219969;
                break;
        }
    }
    return quantity;
}

public totalProductionUOMChange = (ingredientList:any) => {
    ingredientList.unit = "";
    if (ingredientList.isStateLiquid && !ingredientList.smallUnit && !ingredientList.isUOMPieces) {
        ingredientList.unit = "L";
    } else if (!ingredientList.isStateLiquid && !ingredientList.smallUnit && !ingredientList.isUOMPieces) {
        ingredientList.unit = "kg";
    } else if (ingredientList.smallUnit) {
        ingredientList.unit = ingredientList.unitofMeasure.unit;
    }
    return ingredientList;
}

public getTotalProductionWeight = (unit:any, weight:any, totalProductionWeight:any) => {
    if (unit != null && unit != undefined) {
        switch (unit) {
            case "kg": case "KG": case "Kg":
                weight = totalProductionWeight;
                break;
            case "mg": case "MG": case "Mg":
                weight = totalProductionWeight * 0.000001;
                break;
            case "gm": case "GM": case "Gm":
                weight = totalProductionWeight * 0.001;
                break;
            case "lbs": case "LBS": case "Lbs":
                weight = totalProductionWeight * 0.453592;
                break;
            case "l": case "L":
                weight = totalProductionWeight;
                break;
            case "ml": case "ML": case "Ml":
                weight = totalProductionWeight * 0.001;
                break;
            case "oz": case "OZ": case "Oz":
                weight = totalProductionWeight * 0.0283495;
                break;
            case "fl oz": case "floz": case "Fl oz":
                weight = totalProductionWeight * 0.0284131;
                break;
            case "gal": case "gallon": case "GALLON": case "Gal":
                weight = totalProductionWeight * 4.546096000020504;
                break;
        }
    }
    return weight;
}

//need to work on it app.print - invoice , app.delivery-order, app.invoiceimport , app.paymentledgerimport , 
//app.print-inventoryRequest
// app.irdelivery-order , app.print-report
public getAnonymousList = () => {
    var anonymousFeatureList = ["app.dashboard", "app.dashboard.memos", "app.dashboard.direct-messages", "app.dashboard.archive-memos", "app.nopermission",
        "app.myprofile", "landing-page", "app.invoices", "vendor-purchase-order", "print-purchaseOrder",
        "app.print-invoice", "app.delivery-order", "app.invoiceimport", "app.paymentledgerimport", "app.print-inventoryRequest",
        "app.irdelivery-order", "app.print-report", "app.manage-inventory-request", "app.manage-invoice-dashboard", "app.print-productpurchase-report", "app.crm.clientimport"/*,"app.projectinvoice.projectinvoice-expenseview"*/];
    return anonymousFeatureList;
}

public getFeatureListWithParent = () => {
    var anonymousFeatureList = ["app.dashboard", "app.dashboard.memos", "app.dashboard.direct-messages", "app.dashboard.archive-memos", "app.nopermission",
        "app.myprofile", "app.print-report", "app.invoices", "landing-page", "app.manage-invoice", "app.manage-inventory-request",
        "app.new-inventory-request", "app.invoiceimport", "app.ExpenseImport", "app.crm.discountruleimport", "app.crm.noteimport",
        "app.inventory.productimport", "app.print-inventoryreport", "app.paymentledgerimport", "app.crm.meetingapproval", "vendor-purchase-order", "print-purchaseOrder",
        "app.crm.clientimport"];
    return anonymousFeatureList;
}

public isInvoiceDraftMode = (status:any) => status === 1;
public isInvoicePendingApprovalMode = (status:any) => status === 2;
public isInvoicePendingLogisticReviewMode = (status:any) => status === 3;
public isInvoicePendingReconciliationReviewMode = (status:any) => status === 4;
public isInvoicePendingPaymentMode = (status:any) => status === 5;
public isInvoiceRejectedMode = (status:any) => status === 6;
public isInvoicePaidMode = (status:any) => status === 7;
public isInvoiceCancelledMode = (status:any) => status === 8;
public isInvoiceReceivable = (status:any) => status === 5;
public isIRSubmitted = (status:any) => status === 10;
public isIRPOGenerated = (status:any) => status === 11;
public isPOCreated = (status:any) => status === 12;
public isPOReceived = (status:any) => status === 13;
public isPOSubmittedfromVendor = (status:any) => status === 15;
public isPOSubmittedfromVendorRequiresApproval = (status:any) => status === 16;
public isPOProcessedByVendor = (status:any) => status === 17;
public isIIRReceived = (status:any) => status === 18;
public isPOApproved = (status:any) => status === 19;
public isIIRPendingApproval = (status:any) => status === 20;
public isIIRPendingLogisticReview = (status:any) => status === 21;
public isPendingDateChangeApproval = (status:any) => status === 22;

public getProjectType = (type: any) => {
    switch (type) {
        case "1":
            return "service";
        case "2":
            return "product";
        case "3":
            return "expense";
        case "4":
            return "payment";
    }
    return "";
}
public getProjectStatus = (type: any, pendingPayment?: number, totalAmount?: number, record?: any) => {
    switch (type) {
        case 1: case "1":
            if (record != null && record.product != null) {
                return "Pending Submission";
            }
            return "Draft";
        case 2: case "2":
            return "Pending Processing";
        case 3: case "3":
            return "Pending Reconciliation";
        case 4: case "4":
            if ((totalAmount! - pendingPayment!) > 0 && (totalAmount! - pendingPayment!) < totalAmount!) {
                return "Partially Paid"
            }
            return "Pending Payment";
        case 5: case "5":
            return "Paid";
        case 6: case "6":
            return "Pending Delete";
        case 7: case "7":
            return "Pending Approval";
        case 8: case "8":
            return "InProgress";
        case 9: case "9":
            return "Close";
        case 10: case "10":
            return "Reconciled";
        case 11: case "11":
            return "Submitted";
        case 12: case "12":
            return "Completed";
    }
    return "undefine";
}
public getHeaderProjectStatus = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Open Project";
        case 8: case "8":
            return "In Progress";
        case 9: case "9":
            return "Closed";
    }
    return "undefine";
}
public getProjectApprovalReason = (type: any) => {
    switch (type) {
        case 1: case "1": return "discount changed";
        case 2: case "2": return "line item price changed";
        case 3: case "3": return "line item discount changed";
        case 4: case "4": return "line notes changed";
        case 5: case "5": return "line description changed";
        case 6: case "6": return "line quantity changed";
        case 7: case "7": return "line item added";
        case 8: case "8": return "line item removed";
        case 9: case "9": return "line item cost changed";
        case 10: case "10": return "amount changed";
        case 11: case "11": return "entry date changed";
        case 12: case "12": return "line item title changed";
        case 13: case "13": return "line item unit changed";
    }
    return "Unknown";
};
public getModuleFilterList = () => {
    return [
        { title: "Project Service" },
        { title: "Project Product" },
        { title: "Project Expense" },
        { title: "Project Payment" },
        { title: "Expense" },
        { title: "Payment" },
        { title: "Production" },
        { title: "Tax Rule" },
        { title: "CRM Task" },
        { title: "Discount Rule" },
        { title: "Invoice" },
        { title: "CRMMeeting" },
        { title: "Category" },
        { title: "Category Request" },
    ];
};

public getBankList = () => {
    return [
        { id: 1, title: "BCA" }
    ];
}

public getTransactionTypeList = () => {
    return [
        { id: 1, title: "Debit" },
        { id: 2, title: "Credit" }
    ];
}

public getVisibilityTypeList = () => {
    return [
        { id: 1, title: "User" },
        { id: 2, title: "BDD/Level" },
        { id: 3, title: "Never Assign" }
    ];
}

public getTransactionDateLimit = () => {
    return [
        { id: 1, title: "Month" },
        { id: 2, title: "Three Month" },
        { id: 3, title: "Year" }
    ];
}

public getTransactionAdjustmentType = () => {
    return [
        { id: 1, title: "Adjust" },
        { id: 2, title: "Credit" }
    ];
}

public getTransactionStatus = (type: any) => {
    switch (type) {
        case 1: case "1":
            return "Assigned";
        case 2: case "2":
            return "Never Assign";
        case 3: case "3":
            return "Not Assigned Yet";
        case 4: case "4":
            return "Reconciled";
        case 5: case "5": case 6: case "6":
            return "Pending Approval";
    }
    return "undefine";
}

public getAllApprovals = (type: any) => {
    switch (type) {
        case "PendingApproval": case "Pending": case "PendingRawMaterialChangeApproval": case "PendingManufacturingDateChangeApproval":
        case "PendingRawMaterialReviewScreenApproval": case "PendingEndQuantityApproval": case "PendingPostReconciledApproval":
            return "Pending Approval";
        case "PendingEditApproval": case "PandingEditApproval": return "Pending Edit Approval";
        case "PendingDeleteApproval": return "Pending Delete Approval";
        case "PendingOffsetCategoryApproval": return "Pending OffsetCategory Approval";
        case "PendingManufacturingApproval": return "Pending Approval";
        case "Draft": case "PendingAddApproval": return "Pending Add Approval";
        case "IIRPendingApproval": return "Pending Adjustment Approval";
        case "PendingDateChangeApproval": return "Pending DateChange Approval";
        case "POSubmittedByVendorRequiresApproval": return "PO Awaiting Approval";
        case "PendingFinalApproval": return "Pending Final Approval";
        case "PendingManufacturingReview": return "Discrepancy Needing Approval";
    }
    return "Unknown";
};

public getUserApprovalReason = (type: number) => {
    switch (type) {
        case 1: return "First Name";
        case 2: return "Last Name";
        case 3: return "Access Level";
        case 4: case 5: case 6: return "Role";
        case 7: case 8: case 9: return "Branch";
        case 10: case 11: case 12: return "Department";
        case 13: case 14: case 15: return "Division";
        case 16: return "Address Line 1";
        case 17: return "Address Line 2";
        case 18: return "City";
        case 19: return "Zip Code";
        case 20: return "Insuarance";
        case 21: return "Benefits";
    }
    return "Unknown";
};

public getItemType = () => {
    return [
        { id: 1, title: "Product" },
        { id: 2, title: "Service" }
    ];
  }
}


